import { InferSchemaType, Schema, model } from "mongoose";

export const productSchema = new Schema({
  title: { type: String, required: true, minlength: 3 },
  imageId: { type: String },
  imageUrl: { type: String },
  categories: { type: Array, required: true },
  description: { type: String, required: true },
  inStockAmount: { type: Number, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  isArchived: { type: Boolean },
});

export type Product = InferSchemaType<typeof productSchema>;

export const ProductModel = model("product", productSchema);
