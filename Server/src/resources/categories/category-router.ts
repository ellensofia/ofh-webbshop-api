import express from "express";
import { validateIdMiddleware } from "../../middlewares/validateObjectId";
import { createCategory, getAllCategories, getSpecificCategories } from "./category-controller";

export const categoryRouter = express
  .Router()
  .post("/api/categories/add", createCategory)
  .get("/api/categories", getAllCategories)
  .get("/api/categories/:id", validateIdMiddleware, getSpecificCategories);
