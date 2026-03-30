import React from "react";
import Heading from "../common/Heading";
import { useNavigate } from "react-router";
import Quantity from "../common/Quantity.jsx";
import { useState } from 'react';
import Animatebtn from "../common/Animatebtn.jsx";
// ! adding to cart lai chai local-storage  update garne

import products from "../data/Cart.js";
const Cart = () => {
const [quantities, setQuantities] = useState(
  () => Object.fromEntries(products.map((_, i) => [i, 1]))
);
const updateQuantity = (index, value) => {
  setQuantities(prev => ({ ...prev, [index]: value }));
};
const subPrice = products.reduce(
  (sum, cart, i) => sum + cart.price * quantities[i],
  0
);
const tax =0.13*subPrice;

const totalPrice= subPrice+tax;

const shipping = subPrice > 399 ? 0 : 9.99;

const orderSummary = [
  { label: "Subtotal",  value: subPrice },
  { label: "Tax",       value: tax },
  { label: "Shipping",  value: shipping },
  { label: "Total",     value: totalPrice },
];
  const navigate = useNavigate();
  const itemNum = 3;
  return (
    <div className="  font-fair grid grid-cols-6  ">
      <div className="px-14  col-span-4 py-14 bg-white">
        <Heading mainheading="Your Cart" />
        <p>{itemNum}</p>
        <div className="flex flex-col gap-4">
          {products.map((cart, index) => (
            <div key={index} className="flex justify-between border-b pb-4 border-gray-200">
              <div className="flex gap-8">
                <img src={cart.images[0]} alt={cart.name} className="w-32 h-42" />
                <div id="purchase_info" className="text-lg">
                  <p className="uppercase text-lux ">{cart.category}</p>
                  <p className="text-2xl">{cart.name}</p>

                  <p className="text-hair"><span>Sand</span>.<span>Size M</span></p>
                       <Quantity
                    size={8}
                    quantity={quantities[index]}
                    setQuantity={(val) => updateQuantity(index, val)}
                  />

                  <button className="mt-2 text-hair underline linked">Remove</button>
                </div>
              </div>

              <div>
                <p className="text-4xl text-lux ">${cart.price*quantities[index]}</p>
              </div>
            </div>
          ))}
        </div>
        <button className=" border py-4 px-8 mt-4 uppercase hover:text-white hover:bg-black transition-all duration-100 ease-linear" onClick={()=>navigate('/')}>Continue Shopping</button>
      </div>

      <div className=" col-span-2 border-l border-hair p-8 py-14 bg-cream-light">
          <Heading macroheading={"Order Summary"}/>

          <div className="pt-4 mb-14 ">
{orderSummary.map((item,_)=>(
      <div key={item.label} className={`flex justify-between text-2xl gap-2  ${item.label=="Total"? " font- border-t border-black mt-4 pt-4":""}`}>
    <p className={`${item.label=="Total"? " text-4xl":""}`}>{item.label}</p>
    <p className={`${item.label=="Total"? "text-lux  text-4xl":""}`}>${item.value.toFixed(2)}</p>
  </div>
))}
          </div>
          <Animatebtn str={'Proced to Checkout'}/>
      </div>
    </div>
  );
};

export default Cart;
