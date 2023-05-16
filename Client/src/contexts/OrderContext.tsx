import React, { createContext, useContext, useState } from "react";
import { CartItem } from "../../data";
import { DeliveryValues } from "../components/DeliveryForm";
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

type OrderContextType = {
  order?: Order;
  setOrder: (order: Order) => void;
  createOrder: (deliveryValues: DeliveryValues) => void;
};

// Context object with an initial value of null for the order
const OrderContext = createContext<OrderContextType>({
  setOrder: () => {},
  createOrder: () => {},
});

// Custom hook to easier use the order
export const useOrder = () => useContext(OrderContext);

// Component that provides the order context to its child components
export const OrderProvider = ({ children }: Props) => {
  const [order, setOrder] = useState<Order>();
  const { items, totalItems, totalPrice, clearCart } = useShoppingCart();

  // Creates the order object based on the current shopping cart state and delivery address
  const createOrder = (deliveryValues: DeliveryValues) => {
    const orderNumber = `#${Math.floor(Math.random() * 100000)}`; // Generates a random order number
    const products = items; // Gets the list of products from the shopping cart
    const newOrder: Order = {
      orderNumber,
      products,
      totalItems,
      totalPrice,
      ...deliveryValues,
    };

    setOrder(newOrder); // Updates the order state with the new order
    clearCart();
  };

  // Create an object with all necessary properties and methods for the OrderContext
  const orderContext: OrderContextType = {
    order,
    setOrder,
    createOrder,
  };

  // Renders the child components wrapped inside the OrderContext.Provider
  return (
    <OrderContext.Provider value={orderContext}>
      {children}
    </OrderContext.Provider>
  );
};
