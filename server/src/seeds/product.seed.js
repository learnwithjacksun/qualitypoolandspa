import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";
import connectDB from "../config/database.js";
import process from "process"

const products = [
  {
    name: "Kilimanjaro Life Essential Edition",
    categoryId: "hot-tubs",
    image:
      "https://res.cloudinary.com/dfbj3cyw5/image/upload/v1777529917/qualitypoolspa-images/bdy3ojaidukb8cyp2omj.jpg",
    imagePublicId: crypto.RandomUUID(),
    price: 15000,
    description: `Total number of jets: 59
Pumps: 3 × 3 HP
Heater: 3 kW
Insulation: Life Scandinavian insulation`,
  },
  {
    name: "Kilimanjaro Life Essential Edition",
    categoryId: "hot-tubs",
    image:
      "https://res.cloudinary.com/dfbj3cyw5/image/upload/v1777529917/qualitypoolspa-images/bdy3ojaidukb8cyp2omj.jpg",
    imagePublicId: crypto.RandomUUID(),
    price: 15000,
    description: `Total number of jets: 59
Pumps: 3 × 3 HP
Heater: 3 kW
Insulation: Life Scandinavian insulation`,
  },
];

const seedDB = async () => {
  try {
    // Connect to DB
    await connectDB();
    console.log("✅ MongoDB connected");

    // Optional: clear existing products
    await ProductModel.deleteMany();
    console.log("🧹 Existing products cleared");

    // Insert new data
    await ProductModel.insertMany(products);
    console.log("🌱 Database seeded successfully");

    // Close connection
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

// Run script
seedDB();
