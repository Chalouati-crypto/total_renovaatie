import { getPayload } from "payload";
import configPromise from "../payload.config";
import fs from "fs-extra";
import path from "path";
import "dotenv/config";

/**
 * Script to upload images from a local folder to the work-images collection in Payload CMS
 * Usage: npm run upload-work-images --folder="path/to/images" --category="category-slug"
 */

async function main() {
  console.log("🚀 Starting work images upload process...");
  
  // Get command line arguments
  const args = process.argv.slice(2);
  const folderArg = args.find(arg => arg.startsWith('--folder='))?.split('=')[1];
  const categoryArg = args.find(arg => arg.startsWith('--category='))?.split('=')[1];

  if (!folderArg || !categoryArg) {
    console.error("❌ Error: Please provide both --folder and --category arguments");
    console.log("Usage: npm run upload-work-images --folder=\"path/to/images\" --category=\"category-slug\"");
    
    // Show example categories from the seed data
    console.log("\nExample categories from seed data:");
    console.log("- structural (Structural & Windows)");
    console.log("- technical (Technical & HVAC)");
    console.log("- finishing (Interior Finishing)");
    console.log("- outdoor (Outdoor Living)");
    
    process.exit(1);
  }

  const imageFolderPath = path.resolve(folderArg);
  console.log(`📁 Image folder path: ${imageFolderPath}`);
  console.log(`🏷️  Category slug: ${categoryArg}`);

  // Validate folder exists
  if (!fs.existsSync(imageFolderPath)) {
    console.error(`❌ Error: Folder does not exist: ${imageFolderPath}`);
    process.exit(1);
  }

  // Get all image files from the folder
  const imageFiles = fs.readdirSync(imageFolderPath).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log(`⚠️  No image files found in ${imageFolderPath}`);
    console.log("Supported formats: .jpg, .jpeg, .png, .gif, .webp");
    process.exit(0);
  }

  console.log(`🖼️  Found ${imageFiles.length} image files to upload`);

  // Initialize Payload
  process.env.PAYLOAD_MIGRATE = "none";
  const payload = await getPayload({ config: configPromise });

  // Check if category exists by slug
  const categories = await payload.find({
    collection: "categories",
    where: { slug: { equals: categoryArg } },
    limit: 1,
  });

  const category = categories.docs[0];

  if (!category) {
    console.error(`❌ Error: Category with slug "${categoryArg}" does not exist`);
    console.log("Available categories:");
    const allCategories = await payload.find({
      collection: "categories",
      limit: 100,
    });
    allCategories.docs.forEach(cat => {
      console.log(`- ${cat.slug}: ${cat.name?.en || cat.name}`);
    });
    process.exit(1);
  }

  console.log(`✅ Category found: ${category.name?.en || category.name} (${category.slug})`);

  // Process each image file
  for (let i = 0; i < imageFiles.length; i++) {
    const fileName = imageFiles[i];
    const filePath = path.join(imageFolderPath, fileName);
    
    console.log(`\n[${i + 1}/${imageFiles.length}] Uploading: ${fileName}`);

    try {
      // First, upload the image to the media collection
      const mediaFileBuffer = await fs.readFile(filePath);
      const mediaFileName = path.basename(filePath);
      const mediaFileExtension = path.extname(filePath).substring(1); // Remove the dot
      
      const mediaDoc = await payload.create({
        collection: "media",
        data: {
          alt: `Image ${i + 1} for ${category.name}`,
        },
        file: {
          name: mediaFileName,
          data: mediaFileBuffer,
          mimetype: `image/${mediaFileExtension === 'jpg' ? 'jpeg' : mediaFileExtension}`,
          size: mediaFileBuffer.length,
        },
      });

      console.log(`✅ Uploaded media: ${mediaDoc.id}`);

      // Then create the work-image entry linking to the uploaded media
      // Note: In the Payload collection, category is a relationship field that expects the category ID
      // But in the Drizzle schema, workImages references category by slug
      // So we need to pass the category ID for Payload to handle the relationship properly
      const workImage = await payload.create({
        collection: "work-images",
        data: {
          image: mediaDoc.id,
          category: category.id, // Pass the category ID for the relationship
          aspectRatio: "aspect-square", // Default, can be changed based on actual image dimensions
          isFavorite: false,
        },
      });

      console.log(`✅ Created work image: ${workImage.id}`);

    } catch (error) {
      console.error(`❌ Error uploading ${fileName}:`, error.message);
      
      // Continue with the next file instead of stopping the entire process
      continue;
    }
  }

  console.log(`\n🎉 Completed! Successfully processed ${imageFiles.length} images.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});