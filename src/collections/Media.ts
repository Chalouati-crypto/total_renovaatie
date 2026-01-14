import { type CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // When the UploadThing plugin runs, it puts the key in the 'url'
        // or attaches it to the file object in the request.
        // We can extract it from the filename or the uploadthing response.
        if (data.filename && !data.fileKey) {
          // Fallback: If the plugin doesn't provide a key field directly,
          // the filename is often the key when using UploadThing + Payload
          data.fileKey = data.filename;
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "fileKey",
      type: "text",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "remoteUrl",
      type: "text",
      admin: {
        description: "Legacy field for seeded URLs.",
        position: "sidebar",
      },
    },
  ],
};
