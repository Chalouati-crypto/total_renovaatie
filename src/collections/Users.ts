import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true, // This enables login/logout/session management
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: () => true, // You can restrict this later to only 'admin' users
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
