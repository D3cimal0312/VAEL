import React from 'react'

const Animatebtn = ({str}) => {
  return (
      <div className='bg-lux relative px-6 py-2 group h-16 w-full overflow-hidden  cursor-pointer flex justify-center items-center'>
    

    <div className='absolute inset-0 z-10 bg-black w-full h-full transition-transform duration-600 ease-in-out group-hover:translate-x-full'/>
    

    <div className='relative z-20 text-white text-2xl group-hover:text-cream transion-all duration-600 ease-in-out'>
      <button className='w-full font-bold'>{str} → </button>
    </div>

  </div>
  )
}

export default Animatebtn