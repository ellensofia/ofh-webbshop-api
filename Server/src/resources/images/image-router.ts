import express from "express";
import { auth } from "../../middlewares/auth";
import { deleteImage, getImage, uploadImage } from "./image-controller";

export const imageRouter = express
  .Router()
  .post("/api/images/:id", auth, uploadImage)
  .get("/api/images/:id", getImage)
  .delete("/api/images/:id", auth, deleteImage)