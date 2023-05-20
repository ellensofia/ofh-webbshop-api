import express from "express";
import { auth } from "../../middlewares/auth";
import { deleteProduct, editProduct, getAllProducts, getAllProductsFromCategory, getOneProduct, registerProduct } from "./product-controller";

export const productRouter = express
  .Router()
  .post("/api/products/add", auth, registerProduct)
  .get("/api/products", getAllProducts)
  .get("/api/products/category/:id", getAllProductsFromCategory)
  .get("/api/products/:id", getOneProduct)
  .put("/api/products/:id", auth, editProduct)
  .delete("/api/products/:id", auth, deleteProduct)