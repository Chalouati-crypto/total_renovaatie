import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true, // Anyone can read the settings to see the website
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero Section",
          fields: [
            {
              name: "heroTitle",
              type: "text",
              required: true,
              localized: true, // Key for your 3 languages
            },
            {
              name: "heroSubtitle",
              type: "textarea",
              localized: true,
            },
            {
              name: "ctaText",
              type: "text",
              label: "Call to Action Button",
              localized: true,
            },
          ],
        },
        {
          label: "Contact Info",
          fields: [
            {
              name: "email",
              type: "text",
            },
            {
              name: "phone",
              type: "text",
            },
            {
              name: "address",
              type: "textarea",
              localized: true,
            },
          ],
        },
      ],
    },
  ],
};
