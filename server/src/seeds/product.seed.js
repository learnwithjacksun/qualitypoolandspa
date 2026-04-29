import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";
import connectDB from "../config/database.js";
import process from "process"

// 📦 Seed Data
const products = [
  {
    name: "Essential Edition Spa",
    categoryId: "hot-tubs",
    image: "/images/essential-edition-spa.png",
    imagePublicId: "essential-edition-spa",
    price: 0, // update later
    description: `Total number of jets: 68

Pumps: 3 × 3 HP

Heater: 3 kW

Insulation: Life Scandinavian insulation

Power requirements: 32A (230V / 50Hz), optional 50A or 400V`,
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
