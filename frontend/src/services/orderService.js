import api from "@/lib/api";

export const orderService = {

    // creating order
async createOrder(orderData){

    const res = await api.post("/order",orderData)
    return res.data

},

    // getting order

async getAllOrders(filters = {}){
    
    const res= await api.get("/order",{
        params: filters ? filters : {},
      })
    return res.data
 
    
},

// geting my order
async getMyOrder(){

   
    const res = await api.get("/order/my-orders")
    console.log("order",res.data)

    return res.data
  
},


// update order status
async updateOrderStatus(id,status){
  
    const res = await api.patch(`/order/${id}/status`,{status})
    return res.data
    
},

// concel order
async cancelOrder(id,status){
 
 const res=await api.patch(`/order/${id}/cancel`,{status});

},

// update payment status
async updatePaymentStatus(id,status){

   
    const res= await api.patch(`/order/${id}/payment`,{paymentStatus:status})
    return res.data;
    
},



}