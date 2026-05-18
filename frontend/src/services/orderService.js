import api from "@/lib/api";

export const orderService = {

    // creating order
async createOrder(orderData){
    try{ 
    const res = await api.post("/order",orderData)
    return res.data
    }catch(error){
        console.error('Error creating order:', error);
    throw error;
    
    }
},

    // getting order

async getAllOrders(filters = {}){
    try{ 
    const res= await api.get("/order",{
        params: filters ? filters : {},
      })
    return res.data
    }catch(error){
        console.error('Error fetching orders:', error);
        throw new Error(
             
            'Failed to fetch orders'
        );
    }
},

// geting my order
async getMyOrder(){

    try { 
    const res = await api.get("/order/my-orders")
    console.log("order",res.data)

    return res.data
    }catch(error){
        console.error('Error fetching your orders:', error);
        throw new Error(
             
            'Failed to fetch your orders'
        );
    }
},


// update order status
async updateOrderStatus(id,status){
    try {
    const res = await api.patch(`/order/${id}/status`,{status})
    return res.data
    }catch(error){
        console.error('Error  updateing orders:', error);
        throw new Error(
             
            'Failed to update order status'
        );
    }
},

// concel order
async cancelOrder(id,data){
 try {
 const res=await api.patch(`/order/${id}/cancel`,{data});
 return res.data
 }catch(error){
    console.error('Error  cancel orders:', error);
        throw new Error(
             
            'Failed to cancel order'
        );
 }
},

// update payment status
async updatePaymentStatus(id,status){

    try {
    const res= await api.patch(`/order/${id}/payment`,{paymentStatus:status})
    return res.data;
    }catch(error){
        console.error('Error  payment status:', error);
        throw new Error(
             
            'Failed to update payment status'
        );
    }

},



}