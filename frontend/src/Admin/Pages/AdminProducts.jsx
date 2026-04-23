
import React from 'react'
import ProductColumn from '../components/ProductColumn'
import ProductForm from '../components/ProductForm'
import { ProductsProvider } from '../context'

const AdminProducts = () => {
  return (
    <ProductsProvider>        
      <div>
        <ProductForm />
        <ProductColumn />
      </div>
    </ProductsProvider>
  )
}

export default AdminProducts