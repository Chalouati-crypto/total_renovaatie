# Security & Performance Audit Report
**Total Renovaatie Project**

**Date:** February 4, 2026  
**Analyst:** Senior Principal Software Engineer & Security Researcher  
**Project:** Total Renovaatie (Next.js + PayloadCMS Application)

---

## Executive Summary

This report identifies critical security vulnerabilities, performance bottlenecks, scalability issues, and modernization opportunities in the Total Renovaatie codebase. The analysis prioritizes fixes based on risk level and impact to the application.

---

## Priority 1: Security Vulnerabilities

### 1. Input Validation & Sanitization
**File & Location:** `src/app/(frontend)/[locale]/layout.tsx`  
**Severity:** HIGH

**The Issue:** Locale parameter not properly sanitized before validation

**The Risk:** Potential injection attacks if locale values are used elsewhere

**The Fix:**
```typescript
// Sanitize locale input
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Sanitize locale input
  const sanitizedLocale = locale.replace(/[^a-zA-Z\-_]/g, '');
  
  type Locale = (typeof routing.locales)[number];
  const isValidLocale = routing.locales.includes(sanitizedLocale as Locale);

  if (!isValidLocale) {
    notFound();
  }
  
  // ... rest of the function
}
```

### 2. Image URL Validation
**File & Location:** `src/components/work.tsx`  
**Severity:** HIGH

**The Issue:** Trusting user-provided image URLs without validation

**The Risk:** Cross-site scripting (XSS) vulnerabilities

**The Fix:**
```typescript
// Validate image URLs before rendering
const isValidImageUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    // Only allow known safe domains
    const allowedDomains = [
      'https://utfs.io',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com',
    ];
    
    return allowedDomains.some(domain => parsedUrl.href.startsWith(domain));
  } catch {
    return false;
  }
};

// In the component
const galleryPhotos = useMemo(() => {
  return workImages.map((img): GalleryPhoto => {
    const media = img.image as Media;
    const validatedSrc = isValidImageUrl(media?.url ?? "") ? media?.url ?? "" : "";
    
    return {
      src: validatedSrc,
      width: media?.width ?? 1080,
      height: media?.height ?? 1080,
      categorySlug: typeof img.category === "object" ? img.category.slug : "",
      isFavorite: !!img.isFavorite,
      alt: media?.alt ?? "Project Gallery Image",
    };
  });
}, [workImages]);
```

---

## Priority 2: Performance Bottlenecks

### 3. Database Query Optimization
**File & Location:** `src/lib/data.ts`  
**Severity:** HIGH

**The Issue:** Two separate database queries with nested loops for matching

**The Risk:** O(n*m) complexity causing slow performance as data grows

**The Fix:**
```typescript
// Optimized version using a single query with joins
export async function getCategoriesWithServices(
  locale: "en" | "fr" | "nl" = "en",
) {
  const payload = await getPayload({ config: configPromise });

  // Single query with populated relationships
  const categories = await payload.find({
    collection: "categories",
    locale: locale,
    depth: 1, // This will populate related services
    pagination: false,
  });

  return categories.docs.map(category => ({
    ...category,
    services: category.services || []
  }));
}
```

### 4. Event Handler Optimization
**File & Location:** `src/components/services.tsx`  
**Severity:** HIGH

**The Issue:** Adding event listeners in a loop for each service item

**The Risk:** Memory leaks and performance degradation with many services

**The Fix:**
```typescript
// Use event delegation instead of individual handlers
<div className="grid grid-cols-1 gap-x-16 gap-y-6 text-left md:grid-cols-2"
     onMouseEnter={(e) => {
       const serviceItem = e.target.closest('[data-service-id]');
       if (serviceItem) {
         const imageUrl = serviceItem.dataset.imageUrl;
         if (!isMobile && imageUrl) {
           setHoveredImage(imageUrl);
         }
       }
     }}
     onMouseLeave={() => !isMobile && setHoveredImage(null)}>
  {currentCategory.services.map((service, index) => {
    const isLeft = index % 2 === 0;
    // ... rest of the mapping
  })}
</div>
```

---

## Priority 3: Scalability Issues

### 5. Pagination for Large Datasets
**File & Location:** `src/lib/data.ts`  
**Severity:** MEDIUM

**The Issue:** Fetching all work images without pagination limits

**The Risk:** Memory exhaustion and slow response times as image count increases

**The Fix:**
```typescript
export async function getAllWorkImages(page: number = 1, limit: number = 50): Promise<WorkImage[]> {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "work-images",
    depth: 2,
    limit: limit,
    page: page,
    sort: "-isFavorite, -createdAt",
  });

  return docs;
}

// Also implement a count function to enable proper pagination
export async function getWorkImagesCount(): Promise<number> {
  const payload = await getPayload({ config: configPromise });
  
  const { totalDocs } = await payload.count({
    collection: "work-images",
  });
  
  return totalDocs;
}
```

### 6. Virtualization for Large Lists
**File & Location:** `src/components/services.tsx`  
**Severity:** MEDIUM

**The Issue:** Rendering all services at once without virtualization

**The Risk:** Slow rendering and high memory usage when there are many services

**The Fix:**
```typescript
// Implement virtualization for large lists
import { FixedSizeList as List } from 'react-window';

const ServicesList = ({ services, isMobile }: { services: Service[], isMobile: boolean }) => {
  const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {
    const service = services[index];
    const isLeft = index % 2 === 0;
    
    // Extract image URL properly
    const serviceImg = service.image;
    let serviceImageUrl = "";

    if (typeof serviceImg === "object" && serviceImg !== null) {
      const media = serviceImg;
      if (media.url) {
        serviceImageUrl = media.url;
      } else if (media.filename) {
        serviceImageUrl = `/api/media/file/${media.filename}`;
      }
    }

    return (
      <div
        style={style}
        onMouseEnter={() => {
          if (!isMobile && serviceImageUrl) {
            setHoveredImage(serviceImageUrl);
          }
        }}
        onMouseLeave={() => !isMobile && setHoveredImage(null)}
        className={`group relative cursor-pointer border-b border-black/10 pb-6 transition-all ${
          isLeft ? "text-left" : "text-left md:text-right"
        }`}
      >
        <span className="relative z-10 block text-2xl font-medium tracking-tighter transition-transform duration-300 group-hover:translate-x-2 md:text-4xl md:group-hover:translate-x-4">
          {service.title}
        </span>
        <div
          className={`bg-primary absolute bottom-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full ${
            isLeft
              ? "left-0"
              : "left-0 md:right-0 md:left-auto"
          }`}
        />
      </div>
    );
  };

  return (
    <List
      height={500} // Adjust based on container
      itemCount={services.length}
      itemSize={80} // Approximate height of each item
      layout="vertical"
    >
      {Row}
    </List>
  );
};
```

---

## Priority 4: Modernization Opportunities

### 7. Modern Caching Patterns
**File & Location:** `src/lib/data.ts`  
**Severity:** MEDIUM

**The Issue:** Using older patterns for data fetching without leveraging modern Next.js features

**The Risk:** Suboptimal performance and caching

**The Fix:**
```typescript
// Use the new React.cache API and improved async/await patterns
import { cache } from 'react';
import { unstable_cache as cacheFn } from 'next/cache';

// Modern caching with React.cache
export const getCategoriesWithServices = cache(async (
  locale: "en" | "fr" | "nl" = "en",
) => {
  const payload = await getPayload({ config: configPromise });

  // Use Promise.all for concurrent requests if needed
  const [categoriesReq, servicesReq] = await Promise.all([
    payload.find({
      collection: "categories",
      locale: locale,
      depth: 0,
      pagination: false,
    }),
    payload.find({
      collection: "services",
      locale: locale,
      depth: 1,
      pagination: false,
    })
  ]);

  const categories = categoriesReq.docs;
  const services = servicesReq.docs;

  // More efficient grouping using Map
  const servicesByCategoryId = new Map();
  services.forEach(service => {
    const categoryId = typeof service.category === 'object' 
      ? Number(service.category.id) 
      : Number(service.category);
    
    if (!servicesByCategoryId.has(categoryId)) {
      servicesByCategoryId.set(categoryId, []);
    }
    servicesByCategoryId.get(categoryId).push(service);
  });

  const final = categories.map((category) => ({
    ...category,
    services: servicesByCategoryId.get(Number(category.id)) || [],
  }));

  return final;
});
```

### 8. Improved Responsive Design
**File & Location:** `src/components/services.tsx`  
**Severity:** MEDIUM

**The Issue:** Using useEffect for mobile detection instead of modern responsive design approaches

**The Risk:** Unnecessary re-renders and less efficient code

**The Fix:**
```typescript
// Use a custom hook for responsive design
import { useMediaQuery } from '@/hooks/use-media-query'; // Custom hook

export default function ServicesSection({
  data,
  settings,
}: {
  data: CategoryWithServices[];
  locale: string;
  settings: SiteSetting;
}) {
  const mobileBreakpoint = useMediaQuery('(max-width: 768px)');
  
  // ... rest of the component
}
```

---

## Priority 5: Additional Improvements

### 9. Database Schema Optimization
**File & Location:** `src/server/db/schema.ts`  
**Severity:** LOW

**The Issue:** Missing proper indexing for frequently queried fields

**The Risk:** Slow query performance as data volume increases

**The Fix:**
```typescript
// Enhanced schema with additional indexes
export const workImages = pgTable("work_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  categorySlug: text("category_slug").references(() => categories.slug),
  aspectRatio: text("aspect_ratio").default("aspect-square"),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  // Existing index
  categoryIdx: index("work_images_category_idx").on(table.categorySlug),
  // Additional indexes for common queries
  favoriteIdx: index("work_images_favorite_idx").on(table.isFavorite),
  createdAtIdx: index("work_images_created_at_idx").on(table.createdAt.desc()),
  // Composite index for common filter combinations
  favoriteCreatedAtIdx: index("work_images_fav_created_at_idx").on(
    table.isFavorite.desc(),
    table.createdAt.desc()
  ),
}));
```

---

## Implementation Recommendations

1. **Immediate Actions (Days 1-3):** Address all HIGH severity issues
2. **Short-term (Week 1-2):** Implement MEDIUM severity fixes
3. **Long-term (Month 1):** Apply LOW severity improvements and modernization

## Conclusion

The Total Renovaatie application has a solid foundation but requires attention to security vulnerabilities and performance optimizations. The recommended fixes will significantly improve the application's security posture, performance, and scalability while making the code more maintainable and modern.