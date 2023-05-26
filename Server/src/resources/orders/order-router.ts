import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { validateIdMiddleware } from "../../middlewares/validateObjectId";
import { getAllOrders, getOneOrder, getUserOrders, markAsShipped, registerOrder } from "./order-controller";

export const orderRouter = express
  .Router()
  .post("/api/orders", auth, registerOrder)
  .get("/api/orders", auth, getAllOrders)
  .get("/api/orders/:id", validateIdMiddleware, auth, getOneOrder)
  .put("/api/orders/:id", validateIdMiddleware, auth, authAdmin, markAsShipped)
  .get("/api/orders/user/:id", validateIdMiddleware, auth, getUserOrders);
