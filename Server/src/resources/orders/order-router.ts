import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { getAllOrders, getOneOrder, getUserOrders, markAsShipped, registerOrder } from "./order.controller";

export const orderRouter = express
  .Router()
  .post("/api/orders/add", auth, registerOrder)
  .get("/api/orders", auth, getAllOrders)
  .put("/api/orders/:id", auth, authAdmin, markAsShipped)
  .get("/api/orders/:id", auth, getOneOrder)
  .get("/api/orders/user/:id", auth, getUserOrders)