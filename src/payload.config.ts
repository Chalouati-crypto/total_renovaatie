import { postgresAdapter } from "@payloadcms/db-postgres"; // Swapped from SQLite
import { uploadthingStorage } from "@payloadcms/storage-uploadthing"; // Keep your storage
import sharp from "sharp";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { Media } from "./collections/Media";

import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { SiteSettings } from "./globals/SiteSettings";
import { Categories } from "./collections/Categories";
import { WorkImages } from "./collections/WorkImages";

// Your custom collections

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    // LIVE PREVIEW: This is what makes the text editing magic happen
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // MULTI-LANGUAGE SUPPORT
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "French", code: "fr" },
      { label: "Dutch", code: "nl" },
    ],
    defaultLocale: "en",
    fallback: false,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? "",
    },
    // Only touch tables prefixed with cms_ to stay safe
    tablesFilter: ["cms_*", "payload_*"],
    push: true,
  }),
  collections: [Users, Media, Categories, Services, WorkImages],
  globals: [SiteSettings],
  plugins: [
    uploadthingStorage({
      collections: {
        [Media.slug]: true,
        media: {
          disablePayloadSmartCrops: true,
        },
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN ?? "",
        acl: "public-read",
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
