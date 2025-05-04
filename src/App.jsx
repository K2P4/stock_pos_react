import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AddToCartPage,
  CartPage,
  CategoryPage,
  CheckOutPage,
  ClientLoginPage,
  ClientRegisterPage,
  DashboardPage,
  HomePage,
  InvoicesPage,
  LoginPage,
  OrderCurrentPage,
  OrderDetailPage,
  OrderHistoryPage,
  OrderShopHistoryPage,
  ProductPage,
  ProfilePage,
  RegisterPage,
  StockDetailPage,
  StockPage,
} from "./pages";
import MainLayout from "./MainLayout";
import { ProductDetailComponent } from "./Components";
import AdminRouteGuardComponent from "./Guard/AdminRouteGuard.component";
import ClientRouteGuardComponent from "./Guard/ClientRouteGuard.component";
import PublicGuardComponent from "./Guard/PublicGuard.component";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Admin */}
        <Route element={<AdminRouteGuardComponent />}>
          <Route path="/admin" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="stock" element={<StockPage />} />
            <Route path="stock/:id" element={<StockDetailPage />} />
            <Route path="stock/cart" element={<CartPage />} />
            <Route path="order/history" element={<OrderHistoryPage />} />
            <Route path="order/:id" element={<OrderDetailPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
          </Route>
        </Route>

        {/* Client */}
        <Route element={<ClientRouteGuardComponent />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="invoices" element={<AddToCartPage />} />
            <Route path="order/history" element={<OrderShopHistoryPage />} />
            <Route path="order/current" element={<OrderCurrentPage />} />
            <Route path="stock" element={<ProductPage />} />
            <Route path="stock/:id" element={<ProductDetailComponent />} />
            <Route path="stock/cart" element={<AddToCartPage />} />
            <Route path="stock/checkout" element={<CheckOutPage />} />
          </Route>
        </Route>

        {/* Auth */}
        <Route element={<PublicGuardComponent />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/client/login" element={<ClientLoginPage />} />
          <Route path="/client/register" element={<ClientRegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
