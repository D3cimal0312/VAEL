import CategoryColumn from "@/Admin/components/CategoryColumn"
import CategoryForm from "@/Admin/components/CategoryForm"
import { CategoriesProvider } from "@/Admin/context"
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