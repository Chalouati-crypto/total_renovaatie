# Work Images Upload Script

This script allows you to upload images from a local folder to the `work-images` collection in your Payload CMS.

## Prerequisites

Before running the script, make sure:
1. You have your `.env` file properly configured with your database connection and any required credentials
2. Your database is running and accessible
3. The categories you want to assign images to already exist in your CMS

## Usage

Run the script using the following command:

```bash
npm run upload-work-images -- --folder="path/to/your/images" --category="category-slug"
```

### Parameters

- `--folder`: Path to the folder containing your images (relative or absolute)
- `--category`: The slug of the category to assign the images to

### Example

```bash
npm run upload-work-images -- --folder="./my-images-folder" --category="outdoor"
```

This will:
1. Find all images in the `./my-images-folder` directory
2. Upload each image to the `media` collection
3. Create corresponding entries in the `work-images` collection with the specified category

### Supported Image Formats

The script supports the following image formats:
- JPG/JPEG
- PNG
- GIF
- WebP

### Notes

- Images will be processed sequentially
- Each image will be uploaded to the media collection first, then linked to a work-image entry
- The script will continue processing even if individual uploads fail
- All images will be assigned the "aspect-square" aspect ratio by default (this can be modified in the script)
- All images will have `isFavorite` set to `false` by default (this can be modified in the script)