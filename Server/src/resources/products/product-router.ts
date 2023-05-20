import express from "express";
import { auth } from "../../middlewares/auth";
import { addProduct, deleteProduct, getAllProducts, getAllProductsOfCategory, getProduct, updateProduct } from "./product-controller";

export const productRouter = express
  .Router()
  .post("/api/products/add", auth, addProduct)
  .get("/api/products", getAllProducts)
  .get("/api/products/category/:id", getAllProductsOfCategory)
  .get("/api/products/:id", getProduct)
  .put("/api/products/:id", auth, updateProduct)
  .delete("/api/products/:id", auth, deleteProduct)