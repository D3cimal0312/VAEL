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
      console.log(1);
      const localCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      console.log(localCart.length, "local cart");
      if (localCart.length === 0) return;

      console.log(2);
      const response = await api.post("cart/sync", { items: localCart });
      console.log(response.data, "response");
      localStorage.removeItem(CART_KEY);
      console.log(3);
    } catch (err) {
      console.log(err.message);
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
      // forward the real server message to the component
      throw new Error(
        error.response?.data?.message || error.message || "Registration failed",
      );
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
      await syncGuestCart(); // ← inside try, only runs on success
    } catch (error) {
      // forward the real server message to the component
      throw new Error(
        error.response?.data?.message || error.message || "Invalid credentials",
      );
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
      value={{
        user,
        token,
        LoginUser,
        RegisterUser,
        LogoutUser,
        syncGuestCart,
      }}
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
