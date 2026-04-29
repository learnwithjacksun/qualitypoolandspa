import { db } from './index.js';
import { categories } from './schema.js';
import 'dotenv/config';

const productCategories = [
  {
    nameKey: "hotTubs",
    nameFallback: "Hot Tubs",
    slug: "hot-tubs",
    image: "/category/hot-tub.png",
    descriptionKey: "premiumHotTubsBuiltForComfortHydrotherapyAndYearroundUse",
    descriptionFallback: "Premium hot tubs built for comfort, hydrotherapy, and year-round use.",
    segment: "wellness",
  },
  {
    nameKey: "spas",
    nameFallback: "Spas",
    slug: "spas",
    image: "/category/swim-spa.png",
    descriptionKey: "luxurySpaSystemsWithAdvancedJetsAndEfficientTemperatureControl",
    descriptionFallback: "Luxury spa systems with advanced jets and efficient temperature control.",
    segment: "wellness",
  },
  {
    nameKey: "pools",
    nameFallback: "Pools",
    slug: "pools",
    image: "/category/pools.jpg",
    descriptionKey: "fiberglassAndCustomPoolSolutionsForModernOutdoorLivingSpaces",
    descriptionFallback: "Fiberglass and custom pool solutions for modern outdoor living spaces.",
    segment: "pool-build",
  },
  {
    nameKey: "saunas",
    nameFallback: "Saunas",
    slug: "saunas",
    image: "/category/suana.png",
    descriptionKey: "contemporaryIndoorAndOutdoorSaunasForWellnessAndRecovery",
    descriptionFallback: "Contemporary indoor and outdoor saunas for wellness and recovery.",
    segment: "wellness",
  },
  {
    nameKey: "poolCovers",
    nameFallback: "Pool Covers",
    slug: "pool-covers",
    image: "/category/pool-cover.jpg",
    descriptionKey: "durablePoolCoversToImproveSafetyRetentionAndWaterCleanliness",
    descriptionFallback: "Durable pool covers to improve safety, retention, and water cleanliness.",
    segment: "pool-build",
  },
  {
    nameKey: "heatPumps",
    nameFallback: "Heat Pumps",
    slug: "heat-pumps",
    image: "/category/heatpump.png",
    descriptionKey: "energyefficientHeatPumpsForReliableAndCosteffectivePoolHeating",
    descriptionFallback: "Energy-efficient heat pumps for reliable and cost-effective pool heating.",
    segment: "pool-build",
  },
  {
    nameKey: "saltChlorinators",
    nameFallback: "Salt Chlorinators",
    slug: "salt-chlorinators",
    image: "/category/salt.png",
    descriptionKey: "lowmaintenanceChlorinationSystemsForSofterCleanerPoolWater",
    descriptionFallback: "Low-maintenance chlorination systems for softer, cleaner pool water.",
    segment: "maintenance",
  },
  {
    nameKey: "filters",
    nameFallback: "Filters",
    slug: "filters",
    image: "/category/filter.png",
    descriptionKey: "highperformanceFiltrationEquipmentToKeepYourWaterCrystalClear",
    descriptionFallback: "High-performance filtration equipment to keep your water crystal clear.",
    segment: "maintenance",
  },
  {
    nameKey: "waterChemicals",
    nameFallback: "Water Chemicals",
    slug: "water-chemicals",
    image: "/category/chemical.png",
    descriptionKey: "professionalTreatmentChemicalsForBalanceClarityAndHygiene",
    descriptionFallback: "Professional treatment chemicals for balance, clarity, and hygiene.",
    segment: "maintenance",
  },
];

async function seed() {
  console.log('Seeding categories...');
  for (const category of productCategories) {
    await db.insert(categories).values(category).onConflictDoNothing({ target: categories.slug });
  }
  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
