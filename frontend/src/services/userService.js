import api from "../lib/api";

export const userService = {

  // get all users
  async getAll(filter) {
    const res = await api.get("/users", {
      params: filter ? filter : {},
    });
    console.log(res.data.data, "data");
    return res.data;
  },

  // get single by id
  async getById(id) {
    const res = await api.get(`/users/${id}`);
    return res.data.data;
  },

  // get profile
  async getProfile(userId) {
    const res = await api.get(`/users/profile/${userId}`);
    return res.data.data;
  },

  // update
  async update(id, data) {
    console.log(id, data, "hello1 data");
    const res = await api.patch(`/users/update/${id}`, data);
    return res.data.data;
  },

  // update address
  async updateAddress(type, data) {
    const res = await api.put(`/users/address/${type}`, data);
    return res.data.data;
  },

  // my address
  async getMyAddress() {
    const res = await api.get(`/users/myaddress`);
    return res.data.data;
  },

};