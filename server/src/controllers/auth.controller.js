import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminModel from "../models/admin.model.js";
import process from "process";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists", success: false });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await AdminModel.create({ email, password: passwordHash });
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(201).json({
      message: "Admin registered successfully",
      success: true,
      admin,
      token,
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ message: "Account not found", success: false });
    }

    const isPasswordValid = bcrypt.compareSync(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Admin logged in successfully",
      success: true,
      admin,
      token,
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const checkAuth = async (req, res) => {
  const { admin, token } = req;
  try {
    return res.status(200).json({
      message: "Admin authenticated successfully",
      success: true,
      admin,
      token,
    });
  } catch (error) {
    console.log("Error checking auth:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
