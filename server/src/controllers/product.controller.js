import { deleteImage, uploadImage } from "../config/cloudinary.js";
import ProductModel from "../models/product.model.js";

const normalizeImagePayload = (images, image) => {
  if (Array.isArray(images)) {
    return images.filter((item) => typeof item === "string" && item.trim() !== "");
  }

  if (typeof images === "string" && images.trim() !== "") {
    return [images];
  }

  if (typeof image === "string" && image.trim() !== "") {
    return [image];
  }

  return [];
};

const hasColorSamplePayload = (value) =>
  typeof value === "string" && value.trim() !== "";

export const createProduct = async (req, res) => {
  const { name, categoryId, price, image, images, description, colorSampleImage, tag } = req.body;

  try {
    const imageInputs = normalizeImagePayload(images, image);
    if (imageInputs.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
        success: false,
      });
    }

    const uploadedImages = await Promise.all(imageInputs.map((item) => uploadImage(item)));
    const imageUrls = uploadedImages.map((item) => item.imageUrl);
    const imagePublicIds = uploadedImages.map((item) => item.publicIdImage);

    let colorSampleUrl = undefined;
    let colorSamplePublicId = undefined;
    if (hasColorSamplePayload(colorSampleImage)) {
      const uploaded = await uploadImage(colorSampleImage);
      colorSampleUrl = uploaded.imageUrl;
      colorSamplePublicId = uploaded.publicIdImage;
    }

    const product = await ProductModel.create({
      name,
      categoryId,
      images: imageUrls,
      imagesPublicId: imagePublicIds,
      price,
      description,
      ...(colorSampleUrl !== undefined && {
        colorSampleImage: colorSampleUrl,
        colorSamplePublicId: colorSamplePublicId,
      }),
      ...(typeof tag === "string" && tag.trim() !== "" ? { tag: tag.trim() } : {}),
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
    const { name, categoryId, price, image, images, description, colorSampleImage, tag } = req.body;

    const existingProduct = await ProductModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    const updatePayload = {};
    if (typeof name !== "undefined") updatePayload.name = name;
    if (typeof categoryId !== "undefined") updatePayload.categoryId = categoryId;
    if (typeof price !== "undefined") updatePayload.price = price;
    if (typeof description !== "undefined") updatePayload.description = description;
    if (typeof tag !== "undefined") {
      updatePayload.tag = typeof tag === "string" ? tag.trim() : tag;
    }

    const imageInputs = normalizeImagePayload(images, image);
    if (imageInputs.length > 0) {
      const publicIdsToDelete = Array.isArray(existingProduct.imagesPublicId) && existingProduct.imagesPublicId.length > 0
        ? existingProduct.imagesPublicId
        : existingProduct.imagePublicId
          ? [existingProduct.imagePublicId]
          : [];

      if (publicIdsToDelete.length > 0) {
        await Promise.all(publicIdsToDelete.map((publicId) => deleteImage(publicId)));
      }

      const uploadedImages = await Promise.all(imageInputs.map((item) => uploadImage(item)));
      updatePayload.images = uploadedImages.map((item) => item.imageUrl);
      updatePayload.imagesPublicId = uploadedImages.map((item) => item.publicIdImage);
    }

    if (hasColorSamplePayload(colorSampleImage)) {
      if (existingProduct.colorSamplePublicId) {
        await deleteImage(existingProduct.colorSamplePublicId);
      }
      const uploaded = await uploadImage(colorSampleImage);
      updatePayload.colorSampleImage = uploaded.imageUrl;
      updatePayload.colorSamplePublicId = uploaded.publicIdImage;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updatePayload,
      { returnDocument: "after", runValidators: true },
    );
    return res
      .status(200)
      .json({
        message: "Product updated successfully",
        success: true,
        product: updatedProduct,
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
    const publicIdsToDelete = Array.isArray(product.imagesPublicId) && product.imagesPublicId.length > 0
      ? product.imagesPublicId
      : product.imagePublicId
        ? [product.imagePublicId]
        : [];

    if (publicIdsToDelete.length > 0) {
      await Promise.all(publicIdsToDelete.map((publicId) => deleteImage(publicId)));
    }

    if (product.colorSamplePublicId) {
      await deleteImage(product.colorSamplePublicId);
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
