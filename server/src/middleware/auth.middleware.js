import AdminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import process from "process";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(400)
        .json({ message: "Invalid token, Session expired", success: false });
    }
    const admin = await AdminModel.findById(decoded.id);
    if (!admin) {
      return res
        .status(400)
        .json({ message: "Admin not found", success: false });
    }
    req.admin = admin;
    req.token = token;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export default verifyToken;
