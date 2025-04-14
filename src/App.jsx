import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AddToCartPage,
  CartPage,
  CategoryPage,
  CheckOutPage,
  DashboardPage,
  HomePage,
  InvoicesPage,
  LoginPage,
  OrderCurrentPage,
  OrderHistoryPage,
  ProductPage,
  ProfilePage,
  RegisterPage,
  StockDetailPage,
  StockPage,
} from "./pages";
import MainLayout from "./MainLayout";
import RouteGuardComponent from "./Guard/RouteGuard.component";
import PublicGuardComponent from "./Guard/PublicGuard.component";
import { ProductDetailComponent } from "./Components";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<RouteGuardComponent />}>
          {/* Admin Routes (Only for Admin Users) */}
          <Route path="/admin" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="stock" element={<StockPage />} />
            <Route path="order/history" element={<OrderHistoryPage />} />
            <Route path="order/current" element={<OrderCurrentPage />} />
            <Route path="stock/:id" element={<StockDetailPage />} />
            <Route path="stock/cart" element={<CartPage />} />
            <Route path="stock/checkout" element={<CheckOutPage />} />
          </Route>

          {/* POS User Routes (Only for Normal Users) */}
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="order/current" element={<AddToCartPage />} />
            <Route path="order/history" element={<AddToCartPage />} />
            <Route path="invoices" element={<AddToCartPage />} />
            <Route path="profile" element={<AddToCartPage />} />

            {/* Stock */}
            <Route path="stock" element={<ProductPage />} />
            <Route path="stock/:id" element={<ProductDetailComponent />} />
            <Route path="stock/cart" element={<CartPage />} />
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
