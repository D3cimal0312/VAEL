import { createContext,useContext,useState } from "react";
import {
  useAdminProducts,
  useAdminCategories,
  useAdminUsers,
} from '../hooks/useApi'

const ProductsContext=createContext();
export function ProductsProvider({children}){
     const [refreshKey, setRefreshKey] = useState(0)
     const [productId,setProductId]=useState(null)
  const { products, count, loading, error } = useAdminProducts({}, refreshKey)
  const refetch = () => setRefreshKey(k => k + 1)

   return (
    <ProductsContext.Provider value={{ products, count, loading, error, refetch,productId,setProductId}}>
      {children}
    </ProductsContext.Provider>
  )
}export function useProducts() {
  return useContext(ProductsContext)
}





const CategoriesContext = createContext()

export function CategoriesProvider({ children, sortOrder = 'desc' }) {
  const [refreshKey, setRefreshKey] = useState(0)
     const [categoryId,setCategoryId]=useState(null)

  const { categories, count, loading, error } = useAdminCategories(sortOrder, refreshKey)
  const refetch = () => setRefreshKey(k => k + 1)

  return (
    <CategoriesContext.Provider value={{ categories, count, loading, error, refetch,categoryId,setCategoryId}}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  return useContext(CategoriesContext)
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