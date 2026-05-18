import { useState, useEffect } from 'react';
import { categoryService } from '@/services/categoryService';
import toast from 'react-hot-toast';

// get all admin categories
export function useAdminCategories(filters={}, refreshKey = 0) {
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await categoryService.getAll({...filters, page});
        // console.log(data,"data from use admin categories")
        setCategories(data.data);
        setCount(data.count);
        setTotalPage(data.totalPage);
      } catch (e) {
        toast.error(e.response?.data?.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [JSON.stringify(filters), refreshKey, page]);

  return { categories, loading, count, totalPage, page, setPage };
}

// get single by id
export function useAdminCategory(id) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || id === null) return;
    async function fetch() {
      setLoading(true);
      try {
        const data = await categoryService.getById(id);
        setCategory(data);
      } catch (e) {
        toast.error(e.response?.data?.message || "Failed to fetch category");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [id]);

  return { category, loading };
}