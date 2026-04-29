import { deleteImage, uploadImage } from "../config/cloudinary.js";
import ProductModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const { name, categoryId, price, image, description } = req.body;

  try {
    const { imageUrl, publicIdImage: imagePublicId } = await uploadImage(image);
    const product = await ProductModel.create({
      name,
      categoryId,
      image: imageUrl,
      imagePublicId,
      price,
      description,
    });
    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    return res
      .status(200)
      .json({
        message: "Products fetched successfully",
        success: true,
        products,
      });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await ProductModel.find({ categoryId });
    return res
      .status(200)
      .json({
        message: "Products fetched successfully",
        success: true,
        products,
      });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, price, image } = req.body;
      let imageUpdatedUrl = null;
    let imagePublicId = null;
    if (image) {
      const { imageUrl, publicIdImage } = await uploadImage(image);
      imageUpdatedUrl = imageUrl;
      imagePublicId = publicIdImage;
    }
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { name, categoryId, price, image: imageUpdatedUrl, imagePublicId },
      { returnDocument: "after" },
    );
    return res
      .status(200)
      .json({
        message: "Product updated successfully",
        success: true,
        product,
      });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    if (product.image) {
      await deleteImage(product.imagePublicId);
    }
    await ProductModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({
        message: "Product deleted successfully",
        success: true,
      });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
