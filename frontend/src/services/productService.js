import api from '../lib/api';

export const productService = {

  // get all products with filters
 async getAll(filters = {}) {
    try {
      const res = await api.get('/products', {
        params: Object.fromEntries(
          Object.entries(filters).filter(([, v]) => v !== '')
        ),
      });
      // console.log(res.data, "res data")
      return res.data; 
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error(
         
        'Failed to fetch products'
      );
    }
  },

  // get single by slug
  async getBySlug(slug) {
    try{
const res = await api.get(`/products/${slug}`);
    return res.data.data;
    }catch(error){
      console.error('Error fetching products:', error);
      throw new Error(
         
        'Failed to fetch product'
      );
    }
    
  },

  // get single by id
  async getById(id) {
    try{
    const res = await api.get(`/products/id/${id}`);
    return res.data.data;
    }catch(error){
      console.error('Error fetching products:', error);
      throw new Error(
         
        'Failed to fetch product'
      );
    }

  },

  //  create  
  async create(formData) {
    try{

    const res = await api.post('/products/addproducts', formData);
    return res.data.data;
    }catch(error){

console.error('Error creating product:', error);
      throw new Error(
         
        'Failed to create product'
      );
    }

  },

  // update
  async update(id, formData) {
    try{

    const res = await api.put(`/products/${id}`, formData);
    return res.data.data;
    }catch(error){

console.error('Error updating product:', error);
      throw new Error(
         
        'Failed to update product'
      );
    }
  },

  // remove
  async delete(id) {

    try{
    await api.delete(`/products/${id}`);
    }catch(error){

console.error('Error deleting product:', error);
      throw new Error(
         
        'Failed to delete product'
      );
    }
  },
};