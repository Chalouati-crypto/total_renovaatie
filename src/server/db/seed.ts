import "dotenv/config"; // MUST BE AT THE VERY TOP
import { db } from "./index";
import { categories, services, workImages } from "./schema";

async function main() {
  console.log("🌱 Start seeding granular renovation services...");

  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(workImages);

  // 2. DELETE SERVICES
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(services);

  // 3. DELETE CATEGORIES LAST (The "parents")
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(categories);

  // 1. Insert Categories
  const [structural, technical, finishing, outdoor] = await db
    .insert(categories)
    .values([
      {
        slug: "structural",
        nameEn: "Structural & Windows",
        nameFr: "Gros-œuvre & Vitrerie",
        nameNl: "Ruwbouw & Glaswerk",
      },
      {
        slug: "technical",
        nameEn: "Technical & HVAC",
        nameFr: "Techniques & Sanitaire",
        nameNl: "Technieken & Sanitair",
      },
      {
        slug: "finishing",
        nameEn: "Interior Finishing",
        nameFr: "Finitions & Décoration",
        nameNl: "Binnenafwerking",
      },
      {
        slug: "outdoor",
        nameEn: "Outdoor Living",
        nameFr: "Aménagement Extérieur",
        nameNl: "Buitenomgeving",
      },
    ])
    .returning();

  console.log("✅ Categories created. Inserting granular services...");

  // 2. Insert Services
  await db.insert(services).values([
    // --- CATEGORY: STRUCTURAL & WINDOWS ---
    {
      categoryId: structural!.id,
      titleEn: "Custom Verandas",
      titleFr: "Vérandas sur mesure",
      titleNl: "Veranda's op maat",
      imageUrl: "https://utfs.io/f/placeholder-veranda.jpg",
    },
    {
      categoryId: structural!.id,
      titleEn: "High-Performance Glazing",
      titleFr: "Vitrage haute performance",
      titleNl: "Hoogrendementsbeglazing",
      imageUrl: "https://utfs.io/f/placeholder-glass.jpg",
    },
    {
      categoryId: structural!.id,
      titleEn: "PVC & Aluminum Windows",
      titleFr: "Fenêtres PVC et Aluminium",
      titleNl: "PVC en Aluminium Ramen",
      imageUrl: "https://utfs.io/f/placeholder-windows.jpg",
    },
    {
      categoryId: structural!.id,
      titleEn: "Entrance Doors",
      titleFr: "Portes d'entrée",
      titleNl: "Voordeuren",
      imageUrl: "https://utfs.io/f/placeholder-doors.jpg",
    },

    // --- CATEGORY: TECHNICAL & HVAC ---
    {
      categoryId: technical!.id,
      titleEn: "Electricity & Domotics",
      titleFr: "Électricité et Domotique", // FOR YOUR BELLS & INTERPHONES
      titleNl: "Elektriciteit en Domotica",
      imageUrl: "https://utfs.io/f/placeholder-domotics.jpg",
    },
    {
      categoryId: technical!.id,
      titleEn: "Heat Pumps & AC",
      titleFr: "Pompes à chaleur et Airco",
      titleNl: "Warmtepompen en Airco",
      imageUrl: "https://utfs.io/f/placeholder-heatpump.jpg",
    },
    {
      categoryId: technical!.id,
      titleEn: "Sanitary Plumbing",
      titleFr: "Sanitaire et Plomberie",
      titleNl: "Sanitair en Loodgieterij",
      imageUrl: "https://utfs.io/f/placeholder-plumbing.jpg",
    },
    {
      categoryId: technical!.id,
      titleEn: "Radiator Systems",
      titleFr: "Chauffage par radiateurs",
      titleNl: "Radiatorverwarming",
      imageUrl: "https://utfs.io/f/placeholder-radiators.jpg",
    },

    // --- CATEGORY: FINISHING ---
    {
      categoryId: finishing!.id,
      titleEn: "Custom Joinery & Closets",
      titleFr: "Menuiserie et Placards", // FOR YOUR ATTIC & UTILITY CABINETS
      titleNl: "Maatwerk en Kasten",
      imageUrl: "https://utfs.io/f/placeholder-joinery.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Kitchen Installations",
      titleFr: "Installation de cuisine",
      titleNl: "Keukeninstallatie",
      imageUrl: "https://utfs.io/f/placeholder-kitchen.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Interior Tiling",
      titleFr: "Carrelage intérieur",
      titleNl: "Binnentegels",
      imageUrl: "https://utfs.io/f/placeholder-tiling.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Professional Painting",
      titleFr: "Peinture professionnelle",
      titleNl: "Professionele Schilderwerken",
      imageUrl: "https://utfs.io/f/placeholder-paint.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Polished Concrete & Béton Ciré",
      titleFr: "Béton ciré",
      titleNl: "Polierbeton",
      imageUrl: "https://utfs.io/f/placeholder-beton.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Blinds & Shutters",
      titleFr: "Stores et Volets", // FOR THE "LES GARCONS" SHUTTER
      titleNl: "Gordijnen en Rolluiken",
      imageUrl: "https://utfs.io/f/placeholder-shutters.jpg",
    },
    {
      categoryId: finishing!.id,
      titleEn: "Parquet & Flooring",
      titleFr: "Parquet et Sols",
      titleNl: "Parquet en Vloeren",
      imageUrl: "https://utfs.io/f/placeholder-floor.jpg",
    },

    // --- CATEGORY: OUTDOOR ---
    {
      categoryId: outdoor!.id,
      titleEn: "Wood Terraces",
      titleFr: "Terrasse en bois",
      titleNl: "Houten Terrassen",
      imageUrl: "https://utfs.io/f/placeholder-woodterrace.jpg",
    },
    {
      categoryId: outdoor!.id,
      titleEn: "Stone Paving",
      titleFr: "Pavage et Allées",
      titleNl: "Oprit en Pavage",
      imageUrl: "https://utfs.io/f/placeholder-paving.jpg",
    },
    {
      categoryId: outdoor!.id,
      titleEn: "Concrete Fencing",
      titleFr: "Barrières en béton",
      titleNl: "Betonafsluitingen",
      imageUrl: "https://utfs.io/f/placeholder-concretefence.jpg",
    },
    {
      categoryId: outdoor!.id,
      titleEn: "Exterior Lighting",
      titleFr: "Éclairage extérieur",
      titleNl: "Buitenverlichting",
      imageUrl: "https://utfs.io/f/placeholder-outdoorlight.jpg",
    },
  ]);
  const structuralImages = [
    // --- 10 FAVORITES ---
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY68ocHz1fXPH3rj0C1fZom2VgYpF7qJeAuzKEG",
      isFavorite: true,
      aspectRatio: "aspect-[2/3]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6AJLaD4lwiFONBt3DyX7d62lM4UGpSoLZKs8a",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6u7p3CiR2iIEUJloOQZ7LzSHdKjV8Nc6pTW3b",
      isFavorite: true,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6V11mMlJ8FeLQ1YngErJsbCAhDHdqZIkpKaym",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6FePVcDYHJ17hfMk0VCGeBlxLIZ6us3NAa8Pc",
      isFavorite: true,
      aspectRatio: "aspect-[2/3]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6aGpNysn8qrs46JR7ownX51BlCGzEhxDvi9Ak",
      isFavorite: false,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6zfAS0wkft54su76kSwNgBmXlhi8YMeydR1aC",
      isFavorite: true,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6l2bpU4hXgRsNUDjI2aESLpckux84mViYhJGq",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6A16jOelwiFONBt3DyX7d62lM4UGpSoLZKs8a",
      isFavorite: true,
      aspectRatio: "aspect-[2/3]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6LCQGAC7S254BIAQsiJzVm3WfOFNn9gdpMyeT",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY65XQDnCAO7HRU0zNqsjncLQAbySBFWd3IufxV",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6H7baqYwr4iBEKgPS10Jf3UqMpxkR2woQlaDF",
      isFavorite: false,
      aspectRatio: "aspect-square",
    },

    // --- NON-FAVORITES (The rest of the structural folder) ---
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6ISKMQj5lGemH2pOLTfwE7rN1n3M0KZxitsAo",
      isFavorite: false,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6TsLB4RWaNW5tbqXo3IjY7OeLl4nQCrmSJuAf",
      isFavorite: false,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY630W9mLPJLkgytebRNSAaCnZ2EXxd0HT7wOhI",
      isFavorite: false,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6k2M144Ig648fmxIBevC57qPbTLJGat3cOQH2",
      isFavorite: false,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6ja0uMqbZe0973SUrNM16uPmc2dKth4HYRbIL",
      isFavorite: false,
      aspectRatio: "aspect-[3/4]",
    },
  ];
  const structuralData = structuralImages.map((img) => ({
    ...img,
    categorySlug: "structural",
  }));

  await db.insert(workImages).values(structuralData);

  const technicalImages = [
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6rNELPBMETXAJhto4C5MPSHkKf8nqdQwZ2LrN",
      isFavorite: true,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6atdZR1n8qrs46JR7ownX51BlCGzEhxDvi9Ak",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6Ilh9Pd05lGemH2pOLTfwE7rN1n3M0KZxitsA",
      isFavorite: true,
      aspectRatio: "aspect-[2/3]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6rTscvsMETXAJhto4C5MPSHkKf8nqdQwZ2LrN",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6eTJRy2FoAn6v3tCHgXqlTuUdiNEfGFBayJL0",
      isFavorite: true,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY684dhWUXPH3rj0C1fZom2VgYpF7qJeAuzKEGa",
      isFavorite: true,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6rhViaqMETXAJhto4C5MPSHkKf8nqdQwZ2LrN",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6nRu7kvwst8EQZXDyq3KA9uLG7ndMv04Tp2Jm",
      isFavorite: true,
      aspectRatio: "aspect-[2/3]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6PVIN8t1hnvAQ0rKO9GbC5sYqiEtyTkxSg8Mo",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6fck2v34zmuDl7xZUyOovcY4npCBk2sdtNKA8",
      isFavorite: true,
      aspectRatio: "aspect-[4/5]",
    },

    // --- 5 NON-FAVORITES ---
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6PVIN8t1hnvAQ0rKO9GbC5sYqiEtyTkxSg8Mo",
      isFavorite: false,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6EPxVNQziRS210PdYBs3gCVApX5ZD8ty9uO7H",
      isFavorite: false,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6AUnxTZGlwiFONBt3DyX7d62lM4UGpSoLZKs8",
      isFavorite: false,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6U4nEt5T1boV4WIAe3H90MdQzkjSLyC5Df8lm",
      isFavorite: false,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6LCNbYcDS254BIAQsiJzVm3WfOFNn9gdpMyeT",
      isFavorite: false,
      aspectRatio: "aspect-[2/3]",
    },
  ];

  const technicalData = technicalImages.map((img) => ({
    ...img,
    categorySlug: "technical",
  }));

  // Insert Technical images
  await db.insert(workImages).values(technicalData);
  console.log("✅ Technical images seeded");

  const finishingImages = [
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6w4AeE4ZOxhfYv1pul6BmgnH4ZtdKD2Ibq8wT",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6kCa8RMIg648fmxIBevC57qPbTLJGat3cOQH2",
      isFavorite: true,
      aspectRatio: "aspect-[2/3]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6w2dAfunZOxhfYv1pul6BmgnH4ZtdKD2Ibq8w",
      isFavorite: true,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6elgP9FoAn6v3tCHgXqlTuUdiNEfGFBayJL0Z",
      isFavorite: true,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6WwYwoWtox30IcX18NH2FbOtkQlzmrDfTM7Wv",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6y3sohVHECeP9k5jiVYrgcamUTvH8ZfoBFxAW",
      isFavorite: true,
      aspectRatio: "aspect-[4/5]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6fdaRXy4zmuDl7xZUyOovcY4npCBk2sdtNKA8",
      isFavorite: true,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6bTE4eJ0pCVkLh6Hxli4o7FyP0TW1BKrwDf3d",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6Kcpl226v6MTIiBVeQOHd7xjRmwGXuof4rnWc",
      isFavorite: true,
      aspectRatio: "aspect-[2/3]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6YhEkMb3lNaOE0gHvI5isTuBYJw2yC9Wzc3pR",
      isFavorite: true,
      aspectRatio: "aspect-[3/4]",
    },

    // --- 15 NON-FAVORITES (View All Gallery) ---
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6hoJO6NUuL1xS6Dkn7GtIciETbpVe4BRwYlhK",
      isFavorite: false,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6sKwylgLugWewtQaiLzh4brDkZVfsN1m5Yu3o",
      isFavorite: false,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6nRwkewQst8EQZXDyq3KA9uLG7ndMv04Tp2Jm",
      isFavorite: false,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6ocjiFkDQVtguexJNRb26Pmv9WCZk30FT1saE",
      isFavorite: false,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6HDqhUOhwr4iBEKgPS10Jf3UqMpxkR2woQlaD",
      isFavorite: false,
      aspectRatio: "aspect-[2/3]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6KXm0KP6v6MTIiBVeQOHd7xjRmwGXuof4rnWc",
      isFavorite: false,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6irLkjocfB35JR6ZbrHo2xmvkaXgyNeSA9tpd",
      isFavorite: false,
      aspectRatio: "aspect-[4/5]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6rNjToAMETXAJhto4C5MPSHkKf8nqdQwZ2LrN",
      isFavorite: false,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6AUWhnYHlwiFONBt3DyX7d62lM4UGpSoLZKs8",
      isFavorite: false,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6ScjKlXvycDGF8mnvoskIVPpYqaXArT0dR12i",
      isFavorite: false,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6IKbGHh5lGemH2pOLTfwE7rN1n3M0KZxitsAo",
      isFavorite: false,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6XlnNSmqeuYkApoiJd0cDPRZ1yObClGUTBIW3",
      isFavorite: false,
      aspectRatio: "aspect-[2/3]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6AUSsZM8lwiFONBt3DyX7d62lM4UGpSoLZKs8",
      isFavorite: false,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6WONjRJtox30IcX18NH2FbOtkQlzmrDfTM7Wv",
      isFavorite: false,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6nRvEjCxst8EQZXDyq3KA9uLG7ndMv04Tp2Jm",
      isFavorite: false,
      aspectRatio: "aspect-[3/4]",
    },
  ];

  const finishingData = finishingImages.map((img) => ({
    ...img,
    categorySlug: "finishing",
  }));

  // Add this to your seed script execution
  await db.insert(workImages).values(finishingData);
  console.log("✨ Finishing category seeded with 25 images");

  const outdoorImages = [
    // --- 10 FAVORITES (All Outdoor Images) ---
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6WQEz75tox30IcX18NH2FbOtkQlzmrDfTM7Wv",
      isFavorite: true,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6mPS7ZzVYnrm6TO3FWc2u9aigDCSGXdJzhL0t",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6AEbFvTlwiFONBt3DyX7d62lM4UGpSoLZKs8a",
      isFavorite: true,
      aspectRatio: "aspect-[3/4]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6KNNMWQ6v6MTIiBVeQOHd7xjRmwGXuof4rnWc",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6lTCJGOLhXgRsNUDjI2aESLpckux84mViYhJG",
      isFavorite: true,
      aspectRatio: "aspect-[2/3]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6d974uexsOdgYoaGqM6Rzim13jJuLhNIZFlD5",
      isFavorite: true,
      aspectRatio: "aspect-video",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6ub4HmR2iIEUJloOQZ7LzSHdKjV8Nc6pTW3b4",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6e3MwSqpFoAn6v3tCHgXqlTuUdiNEfGFBayJL",
      isFavorite: true,
      aspectRatio: "aspect-[4/5]",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY64iSvBOe6UREO9FC7oWKNP34MkaGB8DyZbTrg",
      isFavorite: true,
      aspectRatio: "aspect-square",
    },
    {
      url: "https://sd6ugp3ku1.ufs.sh/f/t1VDZOLw8OY6W9sKEjtox30IcX18NH2FbOtkQlzmrDfTM7Wv",
      isFavorite: true,
      aspectRatio: "aspect-video",
    },
  ];

  const outdoorData = outdoorImages.map((img) => ({
    ...img,
    categorySlug: "outdoor",
  }));

  // Add this to your main seed execution block
  await db.insert(workImages).values(outdoorData);
  console.log("🌳 Outdoor category seeded with 10 favorites");

  console.log(
    "✅ Seeding finished! Categories and services are aligned with your project photos.",
  );
}

main().catch((e) => {
  console.error("❌ Seeding failed:");
  console.error(e);
  process.exit(1);
});
