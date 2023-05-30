import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { validateId, validateImage } from "../../middlewares/validation";
import { deleteImage, getImage, uploadImage } from "./image-controller";

// TODO: Reinstate auth and authAdmin (or just authAdmin?)
export const imageRouter = express
  .Router()
  .post("/api/images", auth, authAdmin, validateImage, uploadImage)
  .get("/api/images/:id", validateId, getImage)
  .delete("/api/images/:id", validateId, auth, authAdmin, deleteImage);
