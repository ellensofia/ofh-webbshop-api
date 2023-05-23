import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { getAllOrders, getOneOrder, getUserOrders, markAsShipped, registerOrder } from "./order.controller";

export const orderRouter = express
  .Router()
  .post("/api/orders", registerOrder) // TODO: Add auth middleware
  .get("/api/orders", auth, getAllOrders)
  .get("/api/orders/:id", auth, getOneOrder)
  .put("/api/orders/:id", auth, authAdmin, markAsShipped)
  .get("/api/orders/user/:id", auth, getUserOrders);
