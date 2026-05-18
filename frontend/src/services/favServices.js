import api from "@/lib/api";

export const favServices = {

  // get all fav items
  async getFavorites() {
    const res = await api.get("/favourites");
    return res.data;
  },

  // toggle fav
  async toogleFav(id) {
    const res = await api.post(`/favourites/${id}`);
    return res.data;
  },

  // check fav
  async isFav(id) {
    const res = await api.get(`/favourites/isFav/${id}`);
    return res.data;
  },

  // remove fav items
  async clearFavs() {
    const res = await api.delete(`/favourites/clear`);
    return res.data;
  },

};