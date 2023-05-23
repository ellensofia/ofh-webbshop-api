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

type OrderContextType = {
  order?: Order;
  setOrder: (order: Order) => void;
  createOrder: (addres: TestAddress) => void;
};

//  ---- Test data for backend project ---- //

interface TestNewOrder {
  userId: string;
  orderItems: TestNewOrderItem[];
  address: TestAddress;
  price: number;
}

interface TestNewOrderItem {
  productId: string;
  quantity: number;
}

export interface TestAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postCode: string;
  phoneNumber: string;
}

const testOrderItems: TestNewOrderItem[] = [
  { productId: "1", quantity: 2 },
  { productId: "2", quantity: 1 },
];

const testNewOrder: TestNewOrder = {
  userId: "Bob",
  orderItems: testOrderItems,
  address: {
    firstName: "Bob",
    lastName: "Bobson",
    street: "Bobstreet 1",
    city: "Bobcity",
    postCode: "12345",
    phoneNumber: "1234567890",
  },
  price: 100,
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
  const { items, totalItems, totalPrice, clearCart } = useShoppingCart();

  // Creates the order object based on the current shopping cart state and delivery address
  const createOrder = async (address: TestAddress) => {
    const products = items; // Gets the list of products from the shopping cart

    // TODO: Reactivate following code when frontend adjusted to data structure

    // const newOrder: Order = {
    //   orderNumber,
    //   products,
    //   totalItems,
    //   totalPrice,
    //   ...deliveryValues,
    // };

    const newOrder: TestNewOrder = {
      userId: "placeholderId", // TODO: Replace with actual user id
      orderItems: testOrderItems,
      address,
      price: 100, // TODO: Replace with actual price
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
