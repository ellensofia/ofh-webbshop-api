import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { validateObjectId } from "../../middlewares/validateObjectId";
import { getAllOrders, getOneOrder, getUserOrders, markAsShipped, registerOrder } from "./order-controller";

export const orderRouter = express
  .Router()
  .post("/api/orders", auth, registerOrder)
  .get("/api/orders", auth, getAllOrders)
  .get("/api/orders/:id", validateObjectId, auth, getOneOrder)
  .put("/api/orders/:id", validateObjectId, auth, authAdmin, markAsShipped)
  .get("/api/orders/user/:id", validateObjectId, auth, getUserOrders);
