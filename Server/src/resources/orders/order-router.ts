import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { orderSchema, validateBody, validateId } from "../../middlewares/validation";
import { getAllOrders, getOneOrder, getUserOrders, markAsShipped, registerOrder } from "./order-controller";

export const orderRouter = express
  .Router()
  .post("/api/orders", validateBody(orderSchema.omit(["_id"])), auth, registerOrder)
  .get("/api/orders", auth, authAdmin, getAllOrders)
  .get("/api/orders/:id", validateId, auth, getOneOrder)
  .put("/api/orders/:id", validateId, auth, authAdmin, markAsShipped)
  .get("/api/orders/user/:id", validateId, auth, getUserOrders);
