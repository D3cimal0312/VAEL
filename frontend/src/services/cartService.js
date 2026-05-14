import api from '../lib/api'

export const cartService = {
// !try and catch in all services

  async getCart() {
    try{

    const res = await api.get("/cart")
    return res.data // { count, data: items[] }
    }catch(error){

console.error('Error fetching cart:', error);
      throw new Error(
         
        'Failed to fetch cart'
      );
    }
  },

  // add to cart
  async addToCart(productId, quantity, color, size) {
    try{
      const res = await api.post("/cart", { productId, quantity, color, size })
      return res.data.data // items[] — hook does setCart(items) directly
    }catch(error){
      console.error('Error adding to cart:', error);
      throw new Error(
         
        'Failed to add to cart'
      );
    }

  },


  // update item quanityt
  async updateQuantity(cartItemId, quantity) {
    try{
    const res = await api.patch(`/cart/${cartItemId}`, { quantity })
    console.log("type:", Array.isArray(res.data), "value:", res.data);
    return res.data.data 
    }catch(error){
      console.error('Error updating cart:', error);
      throw new Error(
         
        'Failed to update cart'
      );
    }
  },


  // remove from cart
  async removeFromCart(cartItemId) {
    try{

    const res = await api.delete(`/cart/${cartItemId}`)
    return res.data // { message } — hook filters local state
    }catch(error){
console.error('Error removing from cart:', error);
      throw new Error(
         
        'Failed to remove from cart'
      );
    }
  },


  // clear cart
  async clearCart() {
    try{ 
    const res = await api.delete("/cart/clear")
    return res.data // { message, deleted }
    }catch(error){
console.error('Error clearing cart:', error);
      throw new Error(
         
        'Failed to clear cart'
      );
    }
  },

}