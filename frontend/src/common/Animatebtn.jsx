import React from 'react'

const Animatebtn = ({ str, type = "submit" }) => {
  return (
    <button
      type={type}
      className="bg-lux relative px-6 py-2 group h-16 w-full overflow-hidden cursor-pointer flex justify-center items-center"
    >
      <div className="absolute inset-0 z-10 bg-black w-full h-full transition-transform duration-600 ease-in-out group-hover:translate-x-full" />
      <div className="relative z-20 text-white text-2xl group-hover:text-cream transition-all duration-600 ease-in-out">
        <div className="w-full font-bold">{str}</div>
      </div>
    </button>
  )
}

export default Animatebtn