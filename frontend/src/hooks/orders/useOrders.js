import { useState, useEffect } from "react";
import { orderService } from "@/services/orderService";
import toast from "react-hot-toast";

export function useOrders() {
  const [order, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [spent,setSpent] = useState(0);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await orderService.getMyOrder();
        console.log(data, "order from the useorder customer section");
        setOrders(data.data);
        setCount(data.count);
        setSpent(data.spent)
      } catch (e) {
        toast.error(e.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { order, loading, count ,spent };
}