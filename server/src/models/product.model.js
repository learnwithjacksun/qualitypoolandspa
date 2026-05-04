import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim() !== "");
        },
        message: "Images must be a list of non-empty strings",
      },
    },
    imagePublicId: {
      type: String,
      required: false,
    },
    imagesPublicId: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim() !== "");
        },
        message: "Image public ids must be a list of non-empty strings",
      },
    },
    price: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const ProductModel = model("Product", productSchema);

export default ProductModel;
