import express from "express";
// import { auth } from "../../middlewares/auth";
// import { authAdmin } from "../../middlewares/authAdmin";
import { deleteImage, getImage, uploadImage } from "./image-controller";


// TODO: Reinstate auth and authAdmin
export const imageRouter = express
  .Router()
  .post("/api/images/", uploadImage)
  .get("/api/images/:id", getImage)
  .delete("/api/images/:id", deleteImage)