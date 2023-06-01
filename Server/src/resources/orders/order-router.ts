import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { orderSchema, validateBody, validateId } from "../../middlewares/validation";
import { getAllOrders, getOneOrder, getUserOrders, markAsShipped, registerOrder } from "./order-controller";

export const orderRouter = express
  .Router()
  .post("/api/orders", auth, validateBody(orderSchema.omit(["_id"])), registerOrder)
  .get("/api/orders", auth, authAdmin, getAllOrders)
  .put("/api/orders/:id", auth, authAdmin, validateId, markAsShipped)
  .get("/api/orders/:id", auth, validateId, getOneOrder)
  .get("/api/orders/user/:id", auth, validateId, getUserOrders);
