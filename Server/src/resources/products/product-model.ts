import { InferSchemaType, Schema, model } from "mongoose";

export const productSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
  imageId: { type: String, required: true },
  ImageUrl: { type: String, required: true },
  categories: { type: Array, required: true },
  inStockAmount: { type: Number, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  isArchived: { type: Boolean, required: true }
});

export type Product = InferSchemaType<typeof productSchema>;

export const ProductModel = model("product", productSchema);