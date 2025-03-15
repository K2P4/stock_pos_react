import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  CartPage,
  CategoryPage,
  DashboardPage,
  InvoicesPage,
  LoginPage,
  OrderCurrentPage,
  OrderHistoryPage,
  ProfilePage,
  RegisterPage,
  StockDetailPage,
  StockPage,
} from "./pages";
import MainLayout from "./MainLayout";
import RouteGuardComponent from "./Guard/RouteGuard.component";
import PublicGuardComponent from "./Guard/PublicGuard.component";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<RouteGuardComponent />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/order/history" element={<OrderHistoryPage />} />
            <Route path="/order/current" element={<OrderCurrentPage />} />
            <Route path="/stock/:id" element={<StockDetailPage />} />
            <Route path="/stock/cart" element={<CartPage />} />
          </Route>
        </Route>

        <Route element={<PublicGuardComponent />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
