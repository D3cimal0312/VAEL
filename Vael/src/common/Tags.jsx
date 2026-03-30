import React from 'react'

const Tags = ({items}) => {
  return (
    <div>              <p className='text-hair text-xs tracking-wide uppercase'>
                {items.map((tag, i) => (
                  <span key={i}>{tag}{i < items.length - 1 ? ' · ' : ''}</span>
                ))}
              </p>
              </div>
  )
}

export default Tags