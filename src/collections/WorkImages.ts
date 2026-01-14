import type { CollectionConfig, CollectionSlug } from "payload";

export const WorkImages: CollectionConfig = {
  slug: "work-images",
  admin: {
    // This prevents Payload from trying to find a 'title' or 'url' field
    useAsTitle: "id",
    defaultColumns: ["image", "aspectRatio", "isFavorite"],
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media" as CollectionSlug,
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories" as CollectionSlug,
    },
    {
      name: "aspectRatio",
      type: "select",
      options: ["aspect-square", "aspect-video", "aspect-tall"],
      defaultValue: "aspect-square",
    },
    {
      name: "isFavorite",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
