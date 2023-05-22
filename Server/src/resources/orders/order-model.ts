import { InferSchemaType, Schema, model } from "mongoose";

export const orderItemSchema = new Schema({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true }
});
export type OrderItem = InferSchemaType<typeof orderItemSchema>;


export const AddressSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});
export type Address = InferSchemaType<typeof AddressSchema>;


export const orderSchema = new Schema({
    userId: { type: String, required: true },
    orderItems: { type: [orderItemSchema], required: true },
    address: { type: AddressSchema, required: true },
    price: { type: Number, required: true },
    isShipped: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }

});
export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model("order", orderSchema);