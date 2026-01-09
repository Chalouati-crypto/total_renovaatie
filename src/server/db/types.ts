import { type InferSelectModel } from "drizzle-orm";
import type { categories, services, workImages } from "./schema";

// This extracts the base types from your table definitions
export type Category = InferSelectModel<typeof categories>;
export type Service = InferSelectModel<typeof services>;

// This creates a "Populated" type for when you fetch categories WITH their services
export interface CategoryWithServices extends Category {
  services: Service[];
}
export type DBWorkImage = InferSelectModel<typeof workImages>;

// This matches what react-photo-album expects
export type Photo = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  categorySlug?: string;
  isFavorite: boolean;
};
