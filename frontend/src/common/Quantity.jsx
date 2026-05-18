import React from 'react'
import { Minus, Plus } from "lucide-react";


const Quantity = ({size=12 ,quantity, setQuantity,stock }) => {

  console.log(stock);





  return (
    <div>
        <div className="flex gap " >
            <div
              onClick={() => {
                quantity > 1 ? setQuantity(quantity - 1) : ""
              }}
              className={`bg-black  active:bg-lux  text-white font-bold   text-4xl h-${size} w-${size}  flex justify-center items-center`}
            >
              <Minus />
            </div>

            <div className={`w-${size} h-${size} flex justify-center items-center text-2xl border-t border-b border-lux`}>
              {quantity}
            </div>
            <div
              onClick={() => {
                (stock>quantity)? setQuantity(quantity + 1):""
              }}
              className={`bg-black active:bg-lux  text-white font-bold   text-4xl h-${size} w-${size} flex justify-center items-center `}
            >
              <Plus />
            </div>
          </div>
          </div>
  )
}

export default Quantity