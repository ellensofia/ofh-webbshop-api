import React, { createContext, useContext } from "react";
import { Product } from "./AdminProductContext";
import { useShoppingCart } from "./ShoppingCartContext";
import { useUserContext } from "./UserContext";

interface Props {
  children: React.ReactNode;
}

export interface Order {
  _id: string;
  userId: string;
  orderItems: OrderItem[];
  address: Address;
  price: number;
  isShipped: boolean;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
}

interface NewOrder {
  userId: string;
  orderItems: NewOrderItem[];
  address: Address;
  price: number;
}

interface NewOrderItem {
  product: string;
  quantity: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postCode: string;
  phoneNumber: string;
}

type OrderContextType = {
  createOrder: (addres: Address) => void;
};

// Context object with an initial value of null for the order
const OrderContext = createContext<OrderContextType>({
  createOrder: () => {
    null;
  },
});

// Custom hook to easier use the order
export const useOrder = () => useContext(OrderContext);

// Component that provides the order context to its child components
export const OrderProvider = ({ children }: Props) => {
  const { items, totalPrice, clearCart } = useShoppingCart();
  const { user } = useUserContext();

  // Creates the order object based on the current shopping cart state and delivery address
  const createOrder = async (address: Address) => {
    if (!user) throw new Error("User is not logged in");
    const newOrder: NewOrder = {
      userId: user._id, // TODO: Replace with actual user id
      orderItems: items.map((item) => ({ product: item._id, quantity: item.quantity })),
      address,
      price: totalPrice,
    };

    const order = await fetch("api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    }).then((res) => res.json());
    clearCart();
    return order._id;
  };

  // Create an object with all necessary properties and methods for the OrderContext
  const orderContext: OrderContextType = {
    createOrder,
  };

  // Renders the child components wrapped inside the OrderContext.Provider
  return <OrderContext.Provider value={orderContext}>{children}</OrderContext.Provider>;
};
