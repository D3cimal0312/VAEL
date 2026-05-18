import { createContext, useContext, useState, useEffect } from "react";
import { useProducts } from "@/hooks/products/useProducts"; 
import { categoryService } from "@/services/categoryService";

import { useAdminCategories } from "@/hooks/categories/useAdminCategories";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [productId, setProductId]   = useState(null);
  const [modalOpen, setModalOpen]   = useState(false);
  const [categories, setCategories] = useState([]);


  const [filters, setFilters] = useState({
    category:     "",
    gender:       "",
    isNewArrival: "",
    isSale:       "",
    tags:         "",
    sort:         "createdAt",
    order:        "desc",
    limit:        "",
    q:            "",
    stockStatus:  "",
  });

  // unified hook — refreshKey only matters for admin
  const { products, count, totalPage,page,setPage, loading, error } = useProducts(filters, refreshKey);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.simpleCategories();
        setCategories(res);
      }  catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const open    = () => setModalOpen(true);
  const close   = () => setModalOpen(false);
  const refetch = () => setRefreshKey((k) => k + 1);

  const updateFilter = (key, value) => {
    setPage(1); // ← reset page on filter change
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setPage(1);
    setFilters({
      category:     "",
      gender:       "",
      isNewArrival: "",
      isSale:       "",
      tags:         "",
      sort:         "createdAt",
      order:        "desc",
      limit:        "",
      q:            "",
      stockStatus:  "",
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        modalOpen, open, close,
        products, count, loading, error,
        refetch,
        productId, setProductId,
        filters, updateFilter, clearFilters,
        categories,
        page, setPage, totalPage,  // ← pagination
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useAdminProducts() {  
  return useContext(ProductsContext);
}

const CategoriesContext = createContext();

export function CategoriesProvider({ children, order = "desc" }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  const [filters, setFilters] = useState({
    order: "desc",
    q: "",
  });

  const { categories, count, loading,totalPage, page, setPage } = useAdminCategories(
    filters,
    refreshKey
  );
  // console.log(categories, count, loading,totalPage, page,"its the data from admin user categories")
  const refetch = () => setRefreshKey((k) => k + 1);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      order: "desc",
      q: "",
    });
  };

  return (
    <CategoriesContext.Provider
      value={{
        modalOpen,
        open,
        close,
        categories,
        count,
        loading,

        refetch,
        categoryId,
        setCategoryId,

        filters,
        updateFilter,
        clearFilters,

        totalPage, page, setPage,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}

// const UsersContext = createContext()

// export function UsersProvider({ children, query = '' }) {
//   const [refreshKey, setRefreshKey] = useState(0)
//   const { users, loading, error } = useAdminUsers(query, refreshKey)
//   const refetch = () => setRefreshKey(k => k + 1)

//   return (
//     <UsersContext.Provider value={{ users, loading, error, refetch }}>
//       {children}
//     </UsersContext.Provider>
//   )
// }

// export function useUsers() {
//   return useContext(UsersContext)
// }
