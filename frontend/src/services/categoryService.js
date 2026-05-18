import api from '../lib/api';

export const categoryService = {

  // get all categories
  async getAll(filters) {
    const res = await api.get('/categories', { params: filters });
    console.log(res.data, "res data");
    return res.data;
  },

  // get single by id
  async getById(id) {
    const res = await api.get(`/categories/id/${id}`);
    return res.data.data;
  },

  // get simple categories for form
  async simpleCategories() {
    const res = await api.get(`/categories/simpleCategories`);
    return res.data.data;
  },

  // create
  async create(data) {
    const res = await api.post('/categories', data);
    return res.data.data;
  },

  // update
  async update(id, data) {
    const res = await api.put(`/categories/${id}`, data);
    return res.data.data;
  },

}