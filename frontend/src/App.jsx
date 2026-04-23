import { useState, useEffect } from "react";

import "./App.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { Routes, Route } from "react-router-dom";

import Land from "./pages/Land";

import DetailCatPage from "./pages/DetailCatPage";
import About from "./pages/About";
import DetailedProduct from "./pages/DetailedProduct";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Overview from "./Admin/Pages/Overview";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import AdminProducts from "./Admin/Pages/AdminProducts";
import AdminCustomers from "./Admin/Pages/AdminCustomers";
import AdminOrders from "./Admin/Pages/AdminOrders";
import AdminCategories from "./Admin/Pages/AdminCategories";

// !guard imports
import AdminRoute from "./guards/AdminRoute";
import ProtectedRoute from "./guards/ProtectedRoute";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
    AOS.refreshHard();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Land />} />
          <Route path="/category/:category" element={<DetailCatPage />} />
          <Route path="/products/:slug" element={<DetailedProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          
                  <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
            </ProtectedRoute>
        }/>
        </Route>



       

        <Route path="/auth/register" element={<Register />} />

          <Route path="/admin" element={
    <ProtectedRoute>
      <AdminRoute>
        <AdminLayout /> 
      </AdminRoute>
    </ProtectedRoute>
  }>
    <Route index element={<Overview />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="customers" element={<AdminCustomers />} />
    <Route path="categories" element={<AdminCategories />} />
</Route>
      </Routes>
    </div>
  );
}

export default App;
