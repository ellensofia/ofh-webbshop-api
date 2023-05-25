import express from "express";
// import { auth } from "../../middlewares/auth";
// import { authAdmin } from "../../middlewares/authAdmin";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { validateObjectId } from "../../middlewares/validateObjectId";
import { deleteImage, getImage, uploadImage } from "./image-controller";

// TODO: Reinstate auth and authAdmin (or just authAdmin?)
export const imageRouter = express
  .Router()
  .post("/api/images", uploadImage)
  .get("/api/images/:id", validateObjectId, getImage)
  .delete("/api/images/:id", validateObjectId, auth, authAdmin, deleteImage);
