import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import PageNotFound from "./components/PageNotFound";
import ToastOutlet from "./components/ToastOutlet";
import { ProductProvider } from "./contexts/AdminProductContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import "./index.css";
import AdminPage from "./pages/AdminPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConstructionPage from "./pages/ConstructionPage";
import EmptyBagPage from "./pages/EmptyBagPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ProductPage from "./pages/ProductPage";
import StartPage from "./pages/StartPage";
import { theme } from "./theme/theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<ToastOutlet />}
      errorElement={
        <ErrorBoundary>
          <PageNotFound />
        </ErrorBoundary>
      }
    >
      <Route index element={<StartPage />} />
      <Route path="/product/:id/:title/" element={<ProductPage />} />
      <Route path="confirmation" element={<OrderConfirmationPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="admin/product/:id/" element={<AdminProductFormPage />} />
      <Route path="*" element={<h3>404 Not Found</h3>} />
      <Route path="underconstruction" element={<ConstructionPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="emptybag" element={<EmptyBagPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <ProductProvider>
          <ShoppingCartProvider>
            <OrderProvider>
              <RouterProvider router={router} />
            </OrderProvider>
          </ShoppingCartProvider>
        </ProductProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
