import React, { createContext, useContext, useState } from "react";
import { CartItem } from "./AdminProductContext";
import { useShoppingCart } from "./ShoppingCartContext";

interface Props {
  children: React.ReactNode;
}

export interface Order {
  orderNumber: string;
  products: CartItem[];
  email: string;
  name: string;
  address: string;
  city: string;
  postalcode: string;
  phonenumber: string;
  totalItems: number;
  totalPrice: number;
}

interface NewOrder {
  userId: string;
  orderItems: OrderItem[];
  address: Address;
  price: number;
}

interface OrderItem {
  productId: string;
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
  order?: Order;
  setOrder: (order: Order) => void;
  createOrder: (addres: Address) => void;
};

// Context object with an initial value of null for the order
const OrderContext = createContext<OrderContextType>({
  setOrder: () => {
    null;
  },
  createOrder: () => {
    null;
  },
});

// Custom hook to easier use the order
export const useOrder = () => useContext(OrderContext);

// Component that provides the order context to its child components
export const OrderProvider = ({ children }: Props) => {
  const [order, setOrder] = useState<Order>();
  const { items, totalPrice, clearCart } = useShoppingCart();

  // Creates the order object based on the current shopping cart state and delivery address
  const createOrder = async (address: Address) => {
    const newOrder: NewOrder = {
      userId: "placeholderId", // TODO: Replace with actual user id
      orderItems: items.map((item) => ({ productId: item._id, quantity: item.quantity })),
      address,
      price: totalPrice,
    };

    // setOrder(newOrder); // Updates the order state with the new order
    await fetch("api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    clearCart();
  };

  // Create an object with all necessary properties and methods for the OrderContext
  const orderContext: OrderContextType = {
    order,
    setOrder,
    createOrder,
  };

  // Renders the child components wrapped inside the OrderContext.Provider
  return <OrderContext.Provider value={orderContext}>{children}</OrderContext.Provider>;
};
