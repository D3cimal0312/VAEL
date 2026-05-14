import api from "../lib/api";

export const userService = {
  // get all users
  async getAll(filter) {
    try {
      const res = await api.get("/users", {
        params: filter ? filter : {},
      });
      console.log(res.data.data, "data");

      return res.data;
    } catch (error) {
      console.error("error fetching your orders", error);
      throw new Error("Failed to fetch your users dada");
    }
  },

  // get single by id
  async getById(id) {
    try {
      const res = await api.get(`/users/${id}`);
      return res.data.data;
    } catch (error) {
      console.error("error while fetching user", error);
      throw new Error("Failed to fetch user");
    }
  },

  // get profile
  async getProfile(userId) {
    try {
      const res = await api.get(`/users/profile/${userId}`);
      return res.data.data;
    } catch (error) {
      console.error("error while fetching profile", error);
      throw new Error("Failed to fetch profile");
    }
  },

  // update
  async update(id, data) {
    try {
      console.log(id, data, "hello1 data");
      const res = await api.patch(`/users/update/${id}`, data);
      return res.data.data;
    } catch (error) {
      console.error("error while updating user", error);
      throw new Error("Failed to update user");
    }
  },

  // update address
  async updateAddress(type, data) {
    try {
      const res = await api.put(`/users/address/${type}`, data, {});
      return res.data.data;
    } catch (error) {
      console.error("error updating address", error);
      throw new Error("Failed to update address");
    }
  },

// my address
  async getMyAddress() {
    try {
      const res = await api.get(`/users/myaddress`);
      return res.data.data;
    } catch (error) {
      console.error("error fetching address", error);
      throw new Error("Failed to fetch address");
    }
  },
};
