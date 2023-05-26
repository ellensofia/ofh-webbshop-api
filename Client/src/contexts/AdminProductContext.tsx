import React, { createContext, useContext, useState } from "react";
import { Category } from "../contexts/CategoryContext";
// import { Product } from "../../data";

interface Props {
  children: React.ReactNode;
}

// export type Product = ProductValues;
export type Product = {
  categories: Category[];
  title: string;
  price: number;
  description: string;
  brand?: string;
  imageId: string;
  _id: string;
  inStockAmount: number;
  isArchived: boolean;
  timestamp: string;
};

export type NewProduct = {
  title: string;
  price: number;
  description: string;
  brand?: string;
  imageId: string;
  inStockAmount: number;
  isArchived: boolean;
};

export interface CartItem extends Product {
  quantity: number;
}

type ProductContextType = {
  products: Product[];
  getAllProducts: () => void;
  getOneProduct: (_id: string) => Promise<Product | null>;
  addProduct: (product: NewProduct) => Promise<void>;
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
  addProduct: async () => {},
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

  const addProduct = async (product: NewProduct) => {
    try {
      const response = await fetch("/api/products/add", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Product Add Response:", response);
      if (!response.ok) throw new Error("Failed to add product.");

      const newProduct = await response.json();
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const editProduct = async (editedProduct: Product) => {
    try {
      const response = await fetch(`/api/products/${editedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      console.log("Product Edit Response:", response);
      if (!response.ok) throw new Error("Failed to add product.");

      setProducts(products.map((product) => (product._id === editedProduct._id ? editedProduct : product)));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const removeProduct = async (product: Product) => {
    try {
      setProducts(products.filter((p) => p._id !== product._id));

      const imageResponse = await fetch(`/api/images/${product.imageId}`, {
        method: "DELETE",
      });
  
      if (!imageResponse.ok) {
        throw new Error("Failed to delete image");
      }
  
      const productResponse = await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
      });

      if (!productResponse.ok) {
        throw new Error("Failed to delete product");
      }
  
      console.log("Product and image deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
