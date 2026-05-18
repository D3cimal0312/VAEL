import api from '../lib/api';

export const productService = {

  // get all products with filters
  async getAll(filters = {}) {
    const res = await api.get('/products', {
      params: Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '')
      ),
    });
    // console.log(res.data, "res data")
    return res.data;
  },

  // get single by slug
  async getBySlug(slug) {
    const res = await api.get(`/products/${slug}`);
    return res.data.data;
  },

  // get single by id
  async getById(id) {
    const res = await api.get(`/products/id/${id}`);
    return res.data.data;
  },

  //  create
  async create(formData) {
    const res = await api.post('/products/addproducts', formData);
    return res.data.data;
  },

  // update
  async update(id, formData) {
    const res = await api.put(`/products/${id}`, formData);
    return res.data.data;
  },

  // remove
  async delete(id) {
    await api.delete(`/products/${id}`);
  },

};