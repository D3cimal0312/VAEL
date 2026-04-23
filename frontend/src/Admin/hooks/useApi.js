// !this is th main api instanace for all admin dashboard get req


import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' }); 

// const api = axios.create({ baseURL: 'https://vael.onrender.com' }); 


// !category get requests
// usage: useAdminCategories('desc')a
export function useAdminCategories(sortOrder='desc',refreshKey=0){
     const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(()=>{
        async function fetchCategories(){
            setLoading (true);
            setError(null)
            
         try {
        const res = await api.get('/categories', {
          params: { sortOrder }
        });
        setCategories(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
        

        fetchCategories();
    },[sortOrder,refreshKey]
    );
return {categories,loading,error,count}

}




// !products get request for admin

export function useAdminProducts(filters={},refreshKey=0){
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
   }, [JSON.stringify(filters),refreshKey]);
 
   return { products, count, loading, error };
 }



//    !single product get req


export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return; 

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get(`/products/id/${id}`);
        setProduct(res.data.data); 
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]); 

  return { product, loading, error };
}

//! single category get req

export function useCategory(id) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return; 

    async function fetchCategory() {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get(`/categories/id/${id}`);
        setCategory(res.data.data); 
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategory();
  }, [id]); 

  return { category, loading, error };
}



// !user get req
export function useAdminUsers(query = '',refreshKey=0) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get('/users', {
          params: query.trim()? {query}:{},
        
           headers: {
    Authorization: `Bearer ${token}`
  }
        });
        setUsers(res.data.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [query,refreshKey]);

  return { users, loading, error };
}


export function useAdminUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  return { user, loading, error };}  