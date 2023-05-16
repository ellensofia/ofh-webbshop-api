import React, { createContext, useContext } from "react";
import { Product, products as mockedProducts } from "../../data";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface Props {
  children: React.ReactNode;
}

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  editProduct: (editedProduct: Product) => void;
  product?: Product;
};

// Creates a context object for managing products in the admin interface,
// providing default values for the product list and CRUD operations.
const AdminProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  editProduct: () => {},
  removeProduct: () => {},
});

// Custom hook to easier use the order
export const useProduct = () => useContext(AdminProductContext);

export const ProductProvider = ({ children }: Props) => {
  const [products, setProducts] = useLocalStorageState<Product[]>(
    mockedProducts,
    "products"
  );

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const editProduct = (editedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
  };

  const removeProduct = (product: Product) => {
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const productContext: ProductContextType = {
    products,
    addProduct,
    editProduct,
    removeProduct,
  };

  // Renders the child components wrapped inside the AdminProductContext.Provider
  return (
    <AdminProductContext.Provider value={productContext}>
      {children}
    </AdminProductContext.Provider>
  );
};
