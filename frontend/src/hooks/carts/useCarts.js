import { useState, useEffect } from "react";
import { cartService } from "@/services/cartService";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export const CART_KEY = "guest_cart";
const getLocalCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
const setLocalCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

export default function useCart() {
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        if (user) {
          const res = await cartService.getCart();
          setCart(res.data);
        } else {
          setCart(getLocalCart());
        }
      } catch (e) {
        toast.error(e.message); // toast handles it like everything else

      } finally {
        setLoading(false);
      }
    };
    if (!authLoading) fetchCart();
  }, [user, authLoading]);

  const addToCart = async (product, quantity, color, size) => {
    try {
      if (user) {
        // backend returns updated items[] directly — no need to refetch
        const items = await cartService.addToCart(product._id, quantity, color, size);
        setCart(items);
      } else {
        const local = getLocalCart();
        const existing = local.find(
          (item) =>
            item.productId._id === product._id &&
            item.color?.name === color?.name &&
            item.size === size
        );
        if (existing) {
          existing.quantity += quantity;
        } else {
          local.push({ _id: `${Date.now()}`, productId: { ...product }, quantity, color, size });
        }
        setLocalCart(local);
        setCart([...local]);
      }
      toast.success("Added to cart!");
    } catch (e) {
      // toast.error("Failed to add to cart");
toast.error(e.message)
      throw (e.message); // throw so quickAddToCart knows it failed
    }
  };

  const quickAddToCart = async (product, defaultColor, defaultSize) => {
    try {
      console.log("hello quick add");
      await addToCart(product, 1, defaultColor, defaultSize);
    } catch (e) {
      //  no toast here / addToCart already fired one
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      if (user) {
        await cartService.removeFromCart(cartItemId);
        // filter by subdocument _id — same as before
        setCart((prev) => prev.filter((item) => item._id !== cartItemId));
      } else {
        const updated = getLocalCart().filter((item) => item._id !== cartItemId);
        setLocalCart(updated);
        setCart(updated);
      }
      toast.success("Item removed from cart");
    } catch (e) {
      // toast.error(e.message || "Failed to remove item");
toast.error(e.message)
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      if (user) {
        // backend returns updated items[] directly — no need to refetch
        const items = await cartService.updateQuantity(cartItemId, quantity);
        setCart(items);
      } else {
        const updated = getLocalCart().map((item) =>
          item._id === cartItemId ? { ...item, quantity } : item
        );
        setLocalCart(updated);
        setCart(updated);
      }

    } catch (e) {
      // toast.error(e.message || "Failed to update quantity");
toast.error(e.message)
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        await cartService.clearCart();
      } else {
        localStorage.removeItem(CART_KEY);
      }
      setCart([]);
      toast.success("Cart cleared");
    } catch (e) {
      // toast.error(e.message || "Failed to clear cart");
toast.error(e.message)
    }
  };

  return {
    cart,
    setCart,
    loading,
    count: cart.length,
    addToCart,
    quickAddToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}