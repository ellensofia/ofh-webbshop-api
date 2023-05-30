import express from "express";
import { authAdmin } from "../../middlewares/authAdmin";
import { categorySchema, validateBody, validateId } from "../../middlewares/validation";
import { createCategory, getAllCategories, getSpecificCategories } from "./category-controller";

export const categoryRouter = express
  .Router()
  .post("/api/categories/add", authAdmin, validateBody(categorySchema), createCategory)
  .get("/api/categories", getAllCategories)
  .get("/api/categories/:id", validateId, getSpecificCategories);
