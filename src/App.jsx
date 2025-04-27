import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  CartPage,
  CategoryPage,
  DashboardPage,
  InvoicesPage,
  LoginPage,
  OrderCurrentPage,
  OrderDetailPage,
  OrderHistoryPage,
<<<<<<< Updated upstream
=======
  OrderShopHistoryPage,
  ProductPage,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
          {/* Admin Routes (Only for Admin Users) */}
          <Route path="/admin" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="stock" element={<StockPage />} />

            {/* Order  */}
            <Route path="order/history" element={<OrderHistoryPage />} />
            <Route path="order/:id" element={<OrderDetailPage />} />

            {/* Stock  */}
            <Route path="stock/:id" element={<StockDetailPage />} />
            <Route path="stock/cart" element={<CartPage />} />
          </Route>

          {/* POS User Routes (Only for Normal Users) */}
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="invoices" element={<AddToCartPage />} />

            {/* Order  */}
            <Route path="order/history" element={<OrderShopHistoryPage />} />
            <Route path="order/current" element={<OrderCurrentPage />} />

            {/* Stock */}
            <Route path="stock" element={<ProductPage />} />
            <Route path="stock/:id" element={<ProductDetailComponent />} />
            <Route path="stock/cart" element={<AddToCartPage />} />
            <Route path="stock/checkout" element={<CheckOutPage />} />
>>>>>>> Stashed changes
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
