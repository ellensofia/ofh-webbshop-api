import express from "express";
import { addProduct, deleteProduct, getAllProducts, getAllProductsOfCategory, getProduct, updateProduct } from "./product-controller";

export const userRouter = express
  .Router()
  .post("/api/products/add", addProduct)
  .get("/api/products", getAllProducts)
  .get("/api/products/category/:id", getAllProductsOfCategory)
  .get("/api/products/:id", getProduct)
  .put("/api/products/:id", updateProduct)
  .delete("/api/products/:id", deleteProduct)