import React, { createContext, useContext, useState } from "react";
import { Category } from "../contexts/CategoryContext";
// import { Product } from "../../data";

interface Props {
  children: React.ReactNode;
}

export interface Product {
  categories: Category[];
  _id: string;
  imageUrl: string;
  title: string;
  brand?: string;
  description: string;
  price: number;
  timestamp: string;
  inStockAmount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

type ProductContextType = {
  products: Product[];
  getAllProducts: () => void;
  getOneProduct: (_id: string) => Promise<Product | null>;
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
  getOneProduct: () => Promise.resolve(null),
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

  const getOneProduct = async (_id: string): Promise<Product | null> => {
    try {
      const response = await fetch(`/api/products/${_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product.");
      }
      const getProduct = await response.json();
      return getProduct;
    } catch (error) {
      console.error(error);
      return null;
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
    getOneProduct,
    addProduct,
    editProduct,
    removeProduct,
  };

  // Renders the child components wrapped inside the AdminProductContext.Provider
  return <AdminProductContext.Provider value={productContext}>{children}</AdminProductContext.Provider>;
};
