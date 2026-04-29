import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import process from "process";
import AdminModel from "../models/admin.model.js";
import connectDB from "../config/database.js";

const adminData = {
  email: "admin@qualitypoolspa.se",
  password: "Admin@123",
};

const adminSeed = async () => {
  try {
    await connectDB();

    const passwordHash = await bcrypt.hash(adminData.password, 10);
    await AdminModel.findOneAndUpdate(
      { email: adminData.email },
      {
        $set: {
          email: adminData.email,
          password: passwordHash,
        },
      },
      { upsert: true, new: true, runValidators: true },
    );

    console.log("Admin user seeded successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
};

adminSeed();
