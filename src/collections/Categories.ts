import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true, localized: true }, // Replaces 3 columns
    { name: "slug", type: "text", required: true, unique: true }, // For your URL filters
  ],
};
