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
import { SelectedCategoriesProvider } from "./contexts/SelectedCategoryContext";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import AdminPage from "./pages/AdminPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConstructionPage from "./pages/ConstructionPage";
import EmptyBagPage from "./pages/EmptyBagPage";
import { LoginPage } from "./pages/LoginPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ProductPage from "./pages/ProductPage";
import { RegisterPage } from "./pages/RegisterPage";
import StartPage from "./pages/StartPage";
import { UsersPage } from "./pages/UsersPage";
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
      <Route path="/product/:id/" element={<ProductPage />} />
      <Route path="confirmation/:id/" element={<OrderConfirmationPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="admin/product/:id/" element={<AdminProductFormPage />} />
      <Route path="admin/category/new" element={<AdminCategoryPage />} />
      <Route path="*" element={<h3>404 Not Found</h3>} />
      <Route path="underconstruction" element={<ConstructionPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="emptybag" element={<EmptyBagPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="users" element={<UsersPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <SelectedCategoriesProvider>
          <UserProvider>
            <ProductProvider>
              <ShoppingCartProvider>
                <OrderProvider>
                  <RouterProvider router={router} />
                </OrderProvider>
              </ShoppingCartProvider>
            </ProductProvider>
          </UserProvider>
        </SelectedCategoriesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
