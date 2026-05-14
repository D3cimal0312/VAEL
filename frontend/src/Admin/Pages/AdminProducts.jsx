
import React from 'react'
import ProductColumn from '@/Admin/components/ProductColumn'
import ProductForm from '@/Admin/components/ProductForm'
import { CategoriesProvider } from '@/Admin/context'
import { ProductsProvider } from '@/Admin/context'
import ProductFilter from '@/Admin/components/ProductsFilter'

const AdminProducts = () => {
  return (
    <ProductsProvider>        
      <div className='bg-'>
        <ProductForm />
        <ProductFilter
        />
        <ProductColumn />
      </div>
    </ProductsProvider>
  )
}

export default AdminProducts