import { Request, Response } from "express";
import { updateStockOnOrder } from "../products/product-controller";
import { OrderModel } from "./order-model";
import { UserModel } from "../users/user-model";

export async function registerOrder(req: Request, res: Response) {
  const newOrder = await OrderModel.create(req.body);
  for (const orderItem of req.body.orderItems) {
    await updateStockOnOrder(orderItem.product, orderItem.quantity);
  }
  res.status(201).json(newOrder);
}

export async function getAllOrders(req: Request, res: Response) {
  return console.log("Get All Orders");
}

export async function markAsShipped(req: Request, res: Response) {
  return console.log("Update Order");
}

export async function getOneOrder(req: Request, res: Response) {
  const order = await OrderModel.findById(req.params.id).populate("orderItems.product");
  order ? res.status(200).json(order) : res.status(404).json("Order not found");
}

export async function getUserOrders(req: Request, res: Response) {
  const user = await UserModel.findOne({ _id: req.session?._id})
  const orders = await OrderModel.findById({ userId: user?._id})

  res.status(200).json({
    _id: orders?._id,
    orderItems: orders?.orderItems,
    adress: {
      firstName: orders?.address.firstName,
      lastName: orders?.address.lastName,
      street: orders?.address.street,
      city: orders?.address.city,
      postCode: orders?.address.postCode,
      phoneNumber: orders?.address.phoneNumber,
    },
    price: orders?.price,
    isShipped: orders?.isShipped,
    createdAt: orders?.createdAt,
    updatedAt: orders?.updatedAt
  })
}
