import mongoose from "mongoose";
import process from "process";
import ProductModel from "./models/product.model.js";
import connectDB from "./config/database.js";

const productMigrate = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");
    const migrationResult = await ProductModel.updateMany(
      {
        image: { $exists: true, $nin: [null, ""] },
        $or: [{ images: { $exists: false } }, { images: { $size: 0 } }],
      },
      [
        {
          $set: {
            images: ["$image"],
            imagesPublicId: {
              $cond: {
                if: { $and: [{ $ne: ["$imagePublicId", null] }, { $ne: ["$imagePublicId", ""] }] },
                then: ["$imagePublicId"],
                else: [],
              },
            },
          },
        },
      ],
      {
        updatePipeline: true,
      },
    );
    console.log(`🌱 Database migrated successfully. Matched: ${migrationResult.matchedCount}, Modified: ${migrationResult.modifiedCount}`);
  } catch (error) {
    console.error("❌ Migration error:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
};

productMigrate();
