import { useState, useEffect } from "react";
import { productService } from "@/services/productService";
import toast from "react-hot-toast";

// GET all — used on storefront listing pages
export function useProducts(filters = {}, refreshKey = 0) {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await productService.getAll({...filters,page});
        setProducts(data.data);
        setCount(data.count);
        setTotalPage(data.totalPage);
      
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [JSON.stringify(filters),page, refreshKey]);

  return { products, count, totalPage, page, setPage, loading };
}

// GET single by slug — used on product detail page
export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function fetch() {
      setLoading(true);
      try {
        const data = await productService.getBySlug(slug);
        setProduct(data);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [slug]);

  return { product, loading };
}
