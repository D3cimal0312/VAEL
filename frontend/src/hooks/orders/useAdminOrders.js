import { useState, useEffect } from "react";
import { orderService } from "@/services/orderService";
import toast from "react-hot-toast";


// get all orders
export function useAdminOrders(filters = {}, refreshKey = 0) {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await orderService.getAllOrders({...filters,page});
        setOrders(data.data);
                setCount(data.count);
        setTotalPage(data.totalPage);

      } catch (e) {
        toast.error(e.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [JSON.stringify(filters), refreshKey,page]);

  return { orders, loading, count,totalPage, page, setPage };
}

// export function useAdminOrder(orderNumber) {
//   const [order, setOrder] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetch() {
//       setLoading(true);
//       try {
//         const data = await orderService.getOrderByOrderNumber(orderNumber);
//         setOrder(data.data);
//       } catch (e) {
//         toast.error(e.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetch();
//   }, [orderNumber]);

//   return { order, loading };
// }