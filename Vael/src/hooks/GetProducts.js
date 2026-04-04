
import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' }); 

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [count,    setCount]    = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get('/products', {
          params: Object.fromEntries(
            Object.entries(filters).filter(([, v]) => v !== '')
          ),
        });
        setProducts(res.data.data);
        setCount(res.data.count);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, count, loading, error };
}



export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!slug) return; 

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get(`/products/${slug}`);
        setProduct(res.data.data); 
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]); 

  return { product, loading, error };
}