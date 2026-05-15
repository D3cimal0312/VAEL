import React from 'react'


const IconSelect = ({ icon: Icon, children, ...props }) => {
    const filterSelectClass =
  "border border-offwhite bg-cream-light text-hair-dark text-xl rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lux transition-colors duration-100 cursor-pointer hover:border-hair w-full ";
  return (
     <div className="relative">
    <Icon size={13} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-hair pointer-events-none" />
    <select className={`${filterSelectClass} pl-8`} {...props}>
      {children}
    </select>
  </div>
  )
}

export default IconSelect

