import { InferSchemaType, Schema, model } from "mongoose";

export const orderSchema = new Schema({
    userId: { type: String, required: true },
    orderItems: { type: Array, required: true},
    address: { type: String, required: true },
    price: { type: Number, required: true },
    isShipped: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model("order", orderSchema);