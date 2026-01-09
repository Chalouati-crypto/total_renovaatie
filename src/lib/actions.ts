"use server";

import { db } from "~/server/db";
import { workImages } from "~/server/db/schema";
import { desc } from "drizzle-orm";

export async function getAllWorkImages() {
  return await db.query.workImages.findMany({
    orderBy: [desc(workImages.isFavorite), desc(workImages.createdAt)],
  });
}
