import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { categorySchema, validateBody } from "../../middlewares/validation";
import { createCategory, getAllCategories } from "./category-controller";

export const categoryRouter = express
  .Router()
  .post("/api/categories/add", auth, authAdmin, validateBody(categorySchema), createCategory)
  .get("/api/categories", getAllCategories);
