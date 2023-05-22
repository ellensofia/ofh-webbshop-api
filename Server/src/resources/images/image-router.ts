import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { deleteImage, getImage, uploadImage } from "./image-controller";

export const imageRouter = express
  .Router()
  .post("/api/images/:id", auth, authAdmin, uploadImage)
  .get("/api/images/:id", getImage)
  .delete("/api/images/:id", auth, authAdmin, deleteImage)