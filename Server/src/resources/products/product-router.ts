import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { productSchema, validateBody, validateId } from "../../middlewares/validation";
import { deleteProduct, editProduct, getAllProducts, getOneProduct, registerProduct } from "./product-controller";

export const productRouter = express
  .Router()
  .post("/api/products/add", auth, authAdmin, validateBody(productSchema), registerProduct)
  .get("/api/products", getAllProducts)
  .get("/api/products/:id", validateId, getOneProduct)
  .put("/api/products/:id", auth, authAdmin, validateId, validateBody(productSchema), editProduct)
  .delete("/api/products/:id", auth, authAdmin, validateId, deleteProduct);
