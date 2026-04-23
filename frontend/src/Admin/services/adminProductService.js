
import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' }); 

// const api = axios.create({ baseURL: 'https://vael.onrender.com' }); 


// !categories



export const productService={
    async create(formData){
        try{ 
            const token = localStorage.getItem('token')

console.log(formData,token)
         const res = await api.post("/products/addproducts", formData,{
                headers: { Authorization: `Bearer ${token}` }
            });
      return res.data.data;
        }catch(error){
              console.log("RAW ERROR:", error.response?.data);
            throw new Error(error.response?.data?.message)
        }
    },

    async update (id,formData){
        try {
            const token = localStorage.getItem('token')

        const res = await api.put(`/products/${id}`, formData,{
                headers: { Authorization: `Bearer ${token}` }
            });
        return res.data.data;
        }catch(error){
            throw new Error(error.response?.data?.message)
        }
    },
    
    async delete(id){
        try {
            const token = localStorage.getItem('token')

        await api.delete(`/products/${id}`,{
                headers: { Authorization: `Bearer ${token}` }
            });
        }catch(error){
            throw new Error(error.response?.data?.messsage)
        }
    
    },
    
}