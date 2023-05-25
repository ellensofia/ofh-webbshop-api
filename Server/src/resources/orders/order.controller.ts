import { Request, Response } from "express";
import { updateStockOnOrder } from "../products/product-controller";
import { OrderModel } from "./order-model";

export async function registerOrder(req: Request, res: Response) {
  const newOrder = await OrderModel.create(req.body);
  for (const orderItem of req.body.orderItems) {
    await updateStockOnOrder(orderItem.product, orderItem.quantity);
  }
  res.status(201).json(newOrder);
}

export async function getAllOrders(req: Request, res: Response) {
  const allOrders = await OrderModel.find();
  res.status(200).json(allOrders);
}

export async function markAsShipped(req: Request, res: Response) {
  const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, { isShipped: true }, { new: true });
  updatedOrder ? res.status(200).json(updatedOrder) : res.status(404).json("Order not found");
}

export async function getOneOrder(req: Request, res: Response) {
  const order = await OrderModel.findById(req.params.id).populate("orderItems.product");
  order ? res.status(200).json(order) : res.status(404).json("Order not found");
}

export async function getUserOrders(req: Request, res: Response) {
  const userOrders = await OrderModel.find({ userId: req.session?._id });

  userOrders ? res.status(200).json(userOrders) : res.status(404).json("Order not found");
}
