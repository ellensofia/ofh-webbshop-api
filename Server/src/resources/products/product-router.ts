import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { productSchema, validateBody, validateId } from "../../middlewares/validation";
import {
  deleteProduct,
  editProduct,
  getAllProducts,
  getAllProductsFromCategory,
  getOneProduct,
  registerProduct,
} from "./product-controller";

export const productRouter = express
  .Router()
  // .post("/api/products/add", auth, authAdmin, registerProduct)
  .post("/api/products/add", validateBody(productSchema), registerProduct)
  .get("/api/products", getAllProducts)
  .get("/api/products/category/:id", getAllProductsFromCategory)
  .get("/api/products/:id", validateId, getOneProduct)
  .put("/api/products/:id", validateId, validateBody(productSchema), auth, authAdmin, editProduct)
  .delete("/api/products/:id", validateId, auth, authAdmin, deleteProduct);
