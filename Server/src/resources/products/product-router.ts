import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { validateObjectId } from "../../middlewares/validateObjectId";
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
  .post("/api/products/add", registerProduct)
  .get("/api/products", getAllProducts)
  .get("/api/products/category/:id", getAllProductsFromCategory)
  .get("/api/products/:id", validateObjectId, getOneProduct)
  .put("/api/products/:id", validateObjectId, auth, authAdmin, editProduct)
  .delete("/api/products/:id", validateObjectId, auth, authAdmin, deleteProduct);
