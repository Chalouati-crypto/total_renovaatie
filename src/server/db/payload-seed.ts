import { getPayload } from "payload";
import configPromise from "../../payload.config";
import "dotenv/config";

async function main() {
  process.env.PAYLOAD_MIGRATE = "none";
  const payload = await getPayload({ config: configPromise });

  console.log("🌱 Initializing Seed...");

  // 1. CLEANUP (Wipe existing data)
  await payload.delete({
    collection: "work-images",
    where: { id: { exists: true } },
  });
  await payload.delete({
    collection: "services",
    where: { id: { exists: true } },
  });
  await payload.delete({
    collection: "categories",
    where: { id: { exists: true } },
  });
  await payload.delete({
    collection: "media",
    where: { id: { exists: true } },
  });

  // 2. CATEGORIES DATA
  const categoryMap: Record<string, string> = {};
  const categoriesToSeed = [
    {
      slug: "structural",
      en: "Structural & Windows",
      fr: "Gros-œuvre & Vitrerie",
      nl: "Ruwbouw & Glaswerk",
    },
    {
      slug: "technical",
      en: "Technical & HVAC",
      fr: "Techniques & Sanitaire",
      nl: "Technieken & Sanitair",
    },
    {
      slug: "finishing",
      en: "Interior Finishing",
      fr: "Finitions & Décoration",
      nl: "Binnenafwerking",
    },
    {
      slug: "outdoor",
      en: "Outdoor Living",
      fr: "Aménagement Extérieur",
      nl: "Buitenomgeving",
    },
  ];

  for (const cat of categoriesToSeed) {
    const created = await payload.create({
      collection: "categories",
      data: { slug: cat.slug, name: cat.en },
    });
    await payload.update({
      collection: "categories",
      id: created.id,
      locale: "fr",
      data: { name: cat.fr },
    });
    await payload.update({
      collection: "categories",
      id: created.id,
      locale: "nl",
      data: { name: cat.nl },
    });
    categoryMap[cat.slug] = created.id.toString();
  }
  console.log("✅ Categories Seeded");

  // 3. SERVICES DATA
  const servicesToSeed = [
    {
      catSlug: "structural",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6sPsGTdugWewtQaiLzh4brDkZVfsN1m5Yu3oO",
      en: "Custom Verandas",
      fr: "Vérandas sur mesure",
      nl: "Veranda's op maat",
    },
    {
      catSlug: "structural",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6l9BipLhXgRsNUDjI2aESLpckux84mViYhJGq",
      en: "High-Performance Glazing",
      fr: "Vitrage haute performance",
      nl: "Hoogrendementsbeglazing",
    },
    {
      catSlug: "structural",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6augzRxn8qrs46JR7ownX51BlCGzEhxDvi9Ak",
      en: "PVC & Aluminum Windows",
      fr: "Fenêtres PVC et Aluminium",
      nl: "PVC en Aluminium Ramen",
    },
    {
      catSlug: "structural",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6CwNv9xvywy4xzSVoi0bfu2eHrBYXjGdJRTPm",
      en: "Entrance Doors",
      fr: "Portes d'entrée",
      nl: "Voordeuren",
    },
    // --- CATEGORY: TECHNICAL & HVAC ---
    {
      catSlug: "technical",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6V17NGCJ8FeLQ1YngErJsbCAhDHdqZIkpKaym",
      en: "Electricity & Domotics",
      fr: "Électricité et Domotique",
      nl: "Elektriciteit en Domotica",
    },
    {
      catSlug: "technical",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6vHiUY76Cq0Vg8SRhZr6uz43s2Undaw5ODoQI",
      en: "Heat Pumps & AC",
      fr: "Pompes à chaleur et Airco",
      nl: "Warmtepompen en Airco",
    },
    {
      catSlug: "technical",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6ijlOaIcfB35JR6ZbrHo2xmvkaXgyNeSA9tpd",
      en: "Sanitary Plumbing",
      fr: "Sanitaire et Plomberie",
      nl: "Sanitair en Loodgieterij",
    },
    {
      catSlug: "technical",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6R9LFAeKQ7kJjO3lzTbSqDfZ9v5pY4VLAUHKR",
      en: "Radiator Systems",
      fr: "Chauffage par radiateurs",
      nl: "Radiatorverwarming",
    },

    // --- CATEGORY: FINISHING ---
    {
      catSlug: "finishing",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6QdcYtrfii09fUo3wVFuRAzeP2cJdv7sLIEgK",
      en: "Custom Joinery & Closets",
      fr: "Menuiserie et Placards",
      nl: "Maatwerk en Kasten",
    },
    {
      catSlug: "finishing",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6ImTRg15lGemH2pOLTfwE7rN1n3M0KZxitsAo",
      en: "Kitchen Installations",
      fr: "Installation de cuisine",
      nl: "Keukeninstallatie",
    },
    {
      catSlug: "finishing",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6b49lXnx0pCVkLh6Hxli4o7FyP0TW1BKrwDf3",
      en: "Interior Tiling",
      fr: "Carrelage intérieur",
      nl: "Binnentegels",
    },
    {
      catSlug: "finishing",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6kRhKUnIg648fmxIBevC57qPbTLJGat3cOQH2",
      en: "Professional Painting",
      fr: "Peinture professionnelle",
      nl: "Professionele Schilderwerken",
    },
    {
      catSlug: "finishing",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6b4ztF1n0pCVkLh6Hxli4o7FyP0TW1BKrwDf3",
      en: "Polished Concrete & Béton Ciré",
      fr: "Béton ciré",
      nl: "Polierbeton",
    },
    {
      catSlug: "finishing",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6FBNWnLYHJ17hfMk0VCGeBlxLIZ6us3NAa8Pc",
      en: "Blinds & Shutters",
      fr: "Stores et Volets",
      nl: "Gordijnen en Rolluiken",
    },
    {
      catSlug: "finishing",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6wWN9TmZOxhfYv1pul6BmgnH4ZtdKD2Ibq8wT",
      en: "Parquet & Flooring",
      fr: "Parquet et Sols",
      nl: "Parquet en Vloeren",
    },
    // --- CATEGORY: OUTDOOR ---
    {
      catSlug: "outdoor",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY652kkjEAO7HRU0zNqsjncLQAbySBFWd3IufxV",
      en: "Wood Terraces",
      fr: "Terrasse en bois",
      nl: "Houten Terrassen",
    },
    {
      catSlug: "outdoor",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6TsK7AdcaNW5tbqXo3IjY7OeLl4nQCrmSJuAf",
      en: "Stone Paving",
      fr: "Pavage et Allées",
      nl: "Oprit en Pavage",
    },
    {
      catSlug: "outdoor",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6dVrOi7exsOdgYoaGqM6Rzim13jJuLhNIZFlD",
      en: "Concrete Fencing",
      fr: "Barrières en béton",
      nl: "Betonafsluitingen",
    },
    {
      catSlug: "outdoor",
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6rgIFRZHMETXAJhto4C5MPSHkKf8nqdQwZ2Lr",
      en: "Exterior Lighting",
      fr: "Éclairage extérieur",
      nl: "Buitenverlichting",
    },
  ];
  console.log("🌱 seeding services");
  // 3. SERVICES DATA
  for (const s of servicesToSeed) {
    const categoryId = categoryMap[s.catSlug];
    if (!categoryId) continue;

    // 1. Create Media with remoteUrl

    // 2. Create Service
    const service = await payload.create({
      collection: "services",
      data: {
        category: Number(categoryId),
        title: s.en,
        // Leave image out or pass null if your schema allows
        // You will add the image via the Admin UI
      },
    });

    // 3. Update Locales (Repeat the relationship IDs here)
    const locales = ["fr", "nl"] as const;
    for (const loc of locales) {
      await payload.update({
        collection: "services",
        id: service.id,
        locale: loc,
        data: {
          title: s[loc],
          category: Number(categoryId),
        },
      });
    }
  }
  console.log("✅ Services Seeded");

  // // 4. WORK IMAGES (GALLERY) DATA
  // const galleryToSeed = [
  //   {
  //     url: "PASTE_URL_HERE",
  //     catSlug: "structural",
  //     fav: true,
  //     ratio: "aspect-tall",
  //   },
  //   // ADD ALL YOUR GALLERY IMAGES HERE
  // ];

  // for (const img of galleryToSeed) {
  //   const media = await payload.create({
  //     collection: "media",
  //     data: {
  //       alt: "Project Gallery Image",
  //       url: img.url,
  //       filename: `gallery-${Math.random().toString(36).substring(7)}.jpg`,
  //     },
  //   });

  //   await payload.create({
  //     collection: "work-images",
  //     data: {
  //       image: media.id,
  //       category: categoryMap[img.catSlug],
  //       isFavorite: img.fav,
  //       aspectRatio: img.ratio,
  //     },
  //   });
  // }
  // console.log("✅ Gallery Seeded");

  // process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
