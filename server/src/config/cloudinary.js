import { v2 as cloudinary } from "cloudinary";
import process from "process";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


/**
 * @param {string|Buffer} file - Path to file, Buffer, or data URI
 * @param {object} [options] - Optional overrides (e.g. folder)
 */
const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder:"qualitypoolspa-images",
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    return {
      imageUrl: result.secure_url,
      publicIdImage: result.public_id,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to upload image", { cause: error });
  }
};


const deleteImage = async (publicIdImage) => {
  const imageDelete = await cloudinary.uploader.destroy(publicIdImage);

  return {
    imageDelete,
  };
};


  export { uploadImage, deleteImage };
