import { Request, Response } from "express";
import { OrderModel } from "./order-model";

export async function registerOrder(req: Request, res: Response) {
  const newOrder = await OrderModel.create(req.body);
  res.status(201).json(newOrder);
}

export async function getAllOrders(req: Request, res: Response) {
  return console.log("Get All Orders");
}

export async function markAsShipped(req: Request, res: Response) {
  return console.log("Update Order");
}

export async function getOneOrder(req: Request, res: Response) {
  console.log("Get one order id: ", req.params.id);
  const order = await OrderModel.findById(req.params.id).populate("orderItems.product");
  order ? res.status(200).json(order) : res.status(404).json("Order not found");
}

export async function getUserOrders(req: Request, res: Response) {
  return console.log("Get User Orders");
}
