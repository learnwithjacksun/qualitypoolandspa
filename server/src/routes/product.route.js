import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductByCategory,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

const productRouter = Router();

// private routes
productRouter.post("/", verifyToken, createProduct);
productRouter.put("/:id", verifyToken, updateProduct);
productRouter.delete("/:id", verifyToken, deleteProduct);

// public routes
productRouter.get("/", getProducts);
productRouter.get("/:categoryId", getProductByCategory);

export default productRouter;