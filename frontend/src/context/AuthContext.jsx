import { createContext, useContext, useState } from "react";
import api from "@/lib/api";
import { CART_KEY } from "@/hooks/carts/useCarts";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // !todo make a function to sync the cart from local to db when user logins
  const syncGuestCart = async () => {
    try {
      const localCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (localCart.length === 0) return;
      await api.post("cart/sync", { items: localCart });
      localStorage.removeItem(CART_KEY);
    } catch (err) {
      console.error(err);
    }
  };

  const RegisterUser = async (payload) => {
    try {
      const response = await api.post("auth/register", payload);
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      await syncGuestCart();
    } catch (error) {
      throw error;
    }
  };

  const LoginUser = async (payload) => {
    try {
      const response = await api.post("auth/login", payload);
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      await syncGuestCart();
    } catch (error) {
      throw error;
    }
  };

  const LogoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, LoginUser, RegisterUser, LogoutUser, syncGuestCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};