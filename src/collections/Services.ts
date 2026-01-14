import type { CollectionConfig, CollectionSlug } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories" as CollectionSlug,
      required: true,
      hasMany: false,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media" as CollectionSlug, // Points to your Media collection
      required: false,
    },
  ],
};
