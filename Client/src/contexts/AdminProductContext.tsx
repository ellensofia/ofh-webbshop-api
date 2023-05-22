import React, { createContext, useContext, useState } from "react";
// import { Product } from "../../data";

interface Props {
  children: React.ReactNode;
}

export interface Product {
  _id: string;
  imageUrl: string;
  title: string;
  brand?: string;
  description: string;
  price: number;
  timestamp: string;
}

export interface CartItem extends Product {
  quantity: number;
}

type ProductContextType = {
  products: Product[];
  getAllProducts: () => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  editProduct: (editedProduct: Product) => void;
  product?: Product;
};

// Creates a context object for managing products in the admin interface,
// providing default values for the product list and CRUD operations.
const AdminProductContext = createContext<ProductContextType>({
  products: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getAllProducts: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addProduct: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  editProduct: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeProduct: () => {},
});

// Custom hook to easier use the order
export const useProduct = () => useContext(AdminProductContext);

export const ProductProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const products = await response.json();
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const editProduct = (editedProduct: Product) => {
    setProducts(products.map((product) => (product._id === editedProduct._id ? editedProduct : product)));
  };

  const removeProduct = (product: Product) => {
    setProducts(products.filter((p) => p._id !== product._id));
  };

  const productContext: ProductContextType = {
    products,
    getAllProducts,
    addProduct,
    editProduct,
    removeProduct,
  };

  // Renders the child components wrapped inside the AdminProductContext.Provider
  return <AdminProductContext.Provider value={productContext}>{children}</AdminProductContext.Provider>;
};
