import api from '../lib/api'

export const cartService = {

  async getCart() {
    const res = await api.get("/cart")
    return res.data 
  },

  // add to cart
  async addToCart(productId, quantity, color, size) {
    const res = await api.post("/cart", { productId, quantity, color, size })
    return res.data.data 
  },

  // update item quantity
  async updateQuantity(cartItemId, quantity) {
    const res = await api.patch(`/cart/${cartItemId}`, { quantity })
    return res.data.data
  },

  // remove from cart
  async removeFromCart(cartItemId) {
    const res = await api.delete(`/cart/${cartItemId}`)
    return res.data
  },

  // clear cart
  async clearCart() {
    const res = await api.delete("/cart/clear")
    return res.data 
  },

}