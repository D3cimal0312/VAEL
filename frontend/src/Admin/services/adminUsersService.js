
import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' }); 

// const api = axios.create({ baseURL: 'https://vael.onrender.com' }); 


// !users



export const userService={

    async update (id,data){
        try {
            const token =  localStorage.getItem('token');
            console.log(token)
        const user=await api.put(`/users/${id}`,data,{

                headers: { Authorization: `Bearer ${token}` }
        }

        );
        return user.data.data;
        }catch(error){
            throw new Error(error.response?.data?.messsage)
        }
    },
    

    
}