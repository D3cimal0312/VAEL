import React from 'react'

const Backgroundtag = ({ tag }) => {
  return (
    <div className='absolute inset-0 flex items-center justify-center z-0 overflow-hidden'>
      <h1
        className='font-fair font-black text-[75px] md:text-[140px] lg:text-[180px] xl:text-[250px] text-cream tracking-wider whitespace-nowrap select-none'
        
      >
        {tag}
      </h1>
    </div>
  )
}

export default Backgroundtag