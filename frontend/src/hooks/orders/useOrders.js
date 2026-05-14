import { useState, useEffect } from "react";
import { orderService } from "@/services/orderService";
import toast from "react-hot-toast";

export function useOrders() {
  const [order, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await orderService.getMyOrder();
        console.log(data, "order from the useorder customer section");
        setOrders(data.data);
        setCount(data.count);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { order, loading, count };
}