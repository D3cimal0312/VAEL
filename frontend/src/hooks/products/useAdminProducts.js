import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';
import toast from 'react-hot-toast';


// get single by id
export function useAdminProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetch() {
      setLoading(true);
      try {
        const data = await productService.getById(id);
        setProduct(data);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [id]);

  return { product, loading };
}