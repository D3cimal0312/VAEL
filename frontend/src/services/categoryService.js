import api from '../lib/api';

export const categoryService = {

  // get all categories
  async getAll(filters) {

    try{
    const res = await api.get('/categories', {
      params:  filters ,
    });
    console.log(res.data,"res data")
    return res.data;
    }catch(error){
      console.error('Error fetching categories:', error);
      throw new Error(
        
        'Failed to fetch categories'
      );
    }

  },

  // get single by id 
  async getById(id) {
    try{
      const res = await api.get(`/categories/id/${id}`);
      return res.data.data;
    }catch(error){
      console.error('Error fetching category:', error);
      throw new Error(
        
        'Failed to fetch category'
      );
    }

  },
  // get simple categories for form
    async simpleCategories() {
    try{
      const res = await api.get(`/categories/simpleCategories`);
      return res.data.data;
    }catch(error){
      console.error('Error fetching category:', error);
      throw new Error(
        
        'Failed to fetch category'
      );
    }

  },

  // acreate
  async create(data) {
    try{
    const res = await api.post('/categories', data);
    return res.data.data;
    }catch(error){
      console.error('Error creating category:', error);
      throw new Error(
        
        'Failed to create category'
      );
    }

  },

  // update
  async update(id, data) {
    try{ 
    const res = await api.put(`/categories/${id}`, data);
    return res.data.data;
  }catch(error){
    console.error('Error updating category:', error);
      throw new Error(
        
        'Failed to update category'
      );
  }},


}