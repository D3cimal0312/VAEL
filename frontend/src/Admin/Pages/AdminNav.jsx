import React from 'react'
import Logo from '@/common/Logo'


import { NavLink } from 'react-router-dom';
import { useState } from 'react';
const AdminNav = () => {
    const [focused,setFocused]=useState("overview");
    const mainlink='/admin'
  return (

    <div className=' flex flex-col  text-2xl  font-fair     pt-8  '>
        <NavLink to={mainlink}>
        <div className='border-b border-gray-400 pl-4'>
            <Logo/>
            <h1 className='uppercase text-xl mb-2'>admin</h1>
        </div>
        </NavLink>
        <div className=' border-b border-gray-400 mt-8'>
            <h1 className='uppercase text-xl pl-4' >main</h1>

<div className=' flex flex-col gap-2 mt-4'>

        <NavLink to={`${mainlink}`}>

            <div  className=' hover:bg-cream-light py-2 pl-6'>Overview</div>
</NavLink>

        <NavLink to={`${mainlink}/products`}>

            <div className=' hover:bg-cream-light py-2 pl-6'>Products</div>
            </NavLink>

        <NavLink to={`${mainlink}/orders`}>

            <div className=' hover:bg-cream-light py-2 pl-6'>Orders</div>
            </NavLink>


        <NavLink to={`${mainlink}/customers`}>

            <div className=' hover:bg-cream-light py-2 pl-6'>Customers</div>
            </NavLink>

            </div>
        </div>
               <div className='flex flex-col gap-2 border-b border-gray-400 mt-8'>
            <h1 className='uppercase text-xl  pl-4'>store</h1>

<div className=' flex flex-col gap-2 mt-4'>

        <NavLink to={`${mainlink}/categories`}>

            <div className=' hover:bg-cream-light py-2 pl-6'>Categories</div>
            </NavLink>

            {/* <div>Tags</div> */}
            </div>
        </div>

        {


        }

        <div  className=' hover:bg-red-300 py-2 pl-6'>
            ~Log out
        </div>

    </div>
  )
}

export default AdminNav