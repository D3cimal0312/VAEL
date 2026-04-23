



import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' }); 

// const api = axios.create({ baseURL: 'https://vael.onrender.com' }); 


// !categories



export const categoryService = {
    async create(data) {
        try {
            const token = localStorage.getItem('token')
            const category = await api.post("/categories", data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return category.data.data;
        } catch(error) {
            throw new Error(error.response?.data?.message)
        }
    },

    async update(id, data) {
        try {
            const token = localStorage.getItem('token')
            const category = await api.put(`/categories/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return category.data.data;
        } catch(error) {
            throw new Error(error.response?.data?.message)
        }
    },

    
    
    
}