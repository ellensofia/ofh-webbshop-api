import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { validateIdMiddleware } from "../../middlewares/validateObjectId";
import {
  deleteProduct,
  editProduct,
  getAllProducts,
  getAllProductsFromCategory,
  getOneProduct,
  registerProduct,
} from "./product-controller";
import { validateProduct } from "./product-validation";

export const productRouter = express
  .Router()
  // .post("/api/products/add", auth, authAdmin, registerProduct)
  .post("/api/products/add", validateProduct, registerProduct)
  .get("/api/products", getAllProducts)
  .get("/api/products/category/:id", getAllProductsFromCategory)
  .get("/api/products/:id", validateIdMiddleware, getOneProduct)
  .put("/api/products/:id", validateIdMiddleware, validateProduct, auth, authAdmin, editProduct)
  .delete("/api/products/:id", validateIdMiddleware, auth, authAdmin, deleteProduct);
