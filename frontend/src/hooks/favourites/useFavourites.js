import { useState, useEffect } from "react";
import { favServices } from "@/services/favServices";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

// get all favourites
export default function useFavourite() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [loadings, setLoadings] = useState(true);

  const getFavourites = async () => {
    setLoadings(true);
    try {
      if (!user) {
        setItems([]);
        setCount(0);
        return;
      }
      const data = await favServices.getFavorites();
      setItems(data.items);
      setCount(data.count);
      return data;
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to fetch favourites");
      setItems([]);
      setCount(0);
    } finally {
      setLoadings(false);
    }
  };

  useEffect(() => {
    if (!authLoading) getFavourites();
  }, [user, authLoading]);

  const isFavourite = (id) => {
    if (!items) return false;
    return items.some((item) => item.product._id === id);
  };


  // const toggle favourite
  const toggleFavourite = async (product) => {
    if (!user) {
      toast.error("Please login to save favourites");
      return;
    }
    try {
      const data = await favServices.toogleFav(product._id);
      setItems(data.items);
      setCount(data.count);
      toast.success(
        data.action === "added"
          ? "Added to favourites!"
          : "Removed from favourites",
      );
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to toggle favourite");
    }
  };

  // clear fav section
  const clearFavourite = async () => {
    try {
      const data = await favServices.clearFavs();
      setItems(data.items);
      setCount(data.count);
      toast.success("Favourites cleared");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to clear favourites");
    }
  };

  return {
    items,
    loadings,
    count,
    isFavourite,
    toggleFavourite,
    clearFavourite,
    getFavourites,
  };
}