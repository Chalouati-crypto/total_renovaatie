import {
  type Category as PayloadCategory,
  type Service as PayloadService,
  type Media,
} from "~/payload-types";

// 1. Base Types (Directly from Payload)
export type Category = PayloadCategory;

// 2. Service with Media Populated
// We use 'Omit' and 'Record' to handle the fact that 'image'
// is an ID in the DB but an Object after it's fetched with depth > 0
export type Service = Omit<PayloadService, "image" | "category"> & {
  image: Media;
  category: string | Category; // Depends on your fetch depth
};

// 3. Populated Category for your Tabs/Navigation
export interface CategoryWithServices extends Category {
  services: Service[];
}

// 4. Photo Album Compatibility Type
export type Photo = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  categorySlug?: string;
  isFavorite: boolean;
};
