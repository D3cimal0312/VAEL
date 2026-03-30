import React from 'react'
import {useState} from 'react';

const Register = () => {

    const [formdata,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",

    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}));
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
    
        const payload={
            firstName:formdata.firstName,
            lastName:formdata.lastName,
            email:formdata.email,
            password:formdata.password,
        };


        // yeta backend ma post garne kaam rakhnu xa 
    }


  return (
    <div>


        <form onSubmit={handleSubmit} className='flex flex-col bg-red-400 gap-4'>
            <div>
                <label htmlFor="First Name">First Name</label>
      <input name="firstName"  value={formdata.firstName}  onChange={handleChange} placeholder="First Name" />
      </div>
      <div >
        <label htmlFor="Last Name">Last Name</label>
      <input name="lastName"  value={formdata.lastName}  onChange={handleChange} placeholder="Last Name" />
</div>

<div>
     <label htmlFor="Email">Email</label>
      <input name="email" value={formdata.email} onChange={handleChange} placeholder="Email" />
      </div>

      <div>
        <label htmlFor="Password">Password</label>
      <input name="password"   value={formdata.password}   onChange={handleChange} type="pasword" />
      </div>

      <div>
        <label htmlFor="ConfirmPasword">Confirm Password</label>
      <input name="confirmPassword"   value={formdata.confirmPassword}   onChange={handleChange} type="passwrod" />
</div>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Register
















































































// import { useState } from "react";

// export default function OrderForm() {
//   const [formData, setFormData] = useState({
//     name:  "",
//     email: "",
//     qty:   1,
//   });

//   // Single handler for all inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // prevent page reload

//     // Build payload
//     const payload = {
//       customerName: formData.name,
//       customerEmail: formData.email,
//       quantity: Number(formData.qty), // cast types as needed
//     };

//     try {
//       const res = await fetch("https://yourapi.com/orders", {
//         method:  "POST",
//         headers: { "Content-Type": "application/json" },
//         body:    JSON.stringify(payload),
//       });

//       const data = await res.json();
//       console.log("Response:", data);
//     } catch (err) {
//       console.error("Error:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name"  value={formData.name}  onChange={handleChange} placeholder="Name" />
//       <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
//       <input name="qty"   value={formData.qty}   onChange={handleChange} type="number" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }