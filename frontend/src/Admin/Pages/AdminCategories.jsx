import CategoryColumn from "../components/CategoryColumn"
import CategoryForm from "../components/CategoryForm"
import { CategoriesProvider } from "../context"
const AdminCategories = () => {
  return (
    <CategoriesProvider>
    <div>
      <CategoryForm/>
      <CategoryColumn/>
    </div>
    </CategoriesProvider>
  )
}

export default AdminCategories