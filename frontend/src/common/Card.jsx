import React from 'react'
import { ShoppingCart } from "lucide-react"
import { Link } from 'react-router'
import Tags from './Tags'
const Card = ({ products ,limit=products.length ,cols=5 }) => {
// change your gridMap to use minmax
const gridMap = {
  // 2: 'grid-cols-[repeat(auto-fill,minmax(280px,1fr))]',
  3: 'grid-cols-[repeat(auto-fill,minmax(255px,1fr))]',
  // 4: 'grid-cols-[repeat(auto-fill,minmax(220px,1fr))]',
  5: 'grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
}

  return (
    <div className='w-full px-4 lg:px-14 py-7 ' >
            <div className={`grid ${gridMap[cols] || gridMap[5]} gap-8`}>
        {products.slice(0,limit).map((item, index) => (

            
<div  key={item.id}  data-aos="fade-up"  >

          <div
            className='  flex flex-col bg-cream rounded-b-lg group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-linear'
            
          >


            <div className='relative overflow-hidden'>
<Link    to={`/products/${item.slug}`}    >

              <img
                src={item?.images[0]}
                alt={item?.name || "product image"}
                onError={(e)=>e.target.src='https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80'}
                className='h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105'
  
              />
              </Link>

              {item.isNewArrival  && <span className='absolute top-3 left-3 bg-ink text-white text-[9px] font-semibold tracking-widest uppercase px-2 py-1'>New</span>}

              <div className='absolute top-3 right-3 flex flex-col gap-2 translate-x-14 group-hover:translate-x-0 transition-all duration-300'>
                <button className='w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm shadow-md hover:bg-lux hover:text-white transition-all duration-300'>♡</button>
              </div>

              <div className='group/bar absolute -bottom-1 left-0 w-full bg-ink text-white tracking-widest uppercase py-3 translate-y-full group-hover:translate-y-0 transition-all duration-300 hover:bg-lux overflow-hidden cursor-none'>
                <div className='flex justify-center transition-all duration-300 group-hover/bar:translate-x-full group-hover/bar:opacity-0'>
                  <span className='text-[11px]'>Add to Cart</span>
                </div>
                <div className='absolute inset-0 flex justify-center items-center -translate-x-full group-hover/bar:translate-x-0 transition-all duration-300'>
                  <ShoppingCart size={22} />
                </div>
              </div>
            </div>


<Link    to={`/product/${item.id}`}    >

            
            <div className='px-4 py-4 flex flex-col gap-1.5 relative'>
              <h3 className='font-fair text-lg tracking-widest '>{item.name}</h3>
              {item.isSale && <span className='absolute top-2 right-0 bg-green-500 text-white text-[12px] font-semibold tracking-widest uppercase  px-2 py-1 rounded-l-xl'>−{Math.floor(
            (item.originalPrice - item.price)
            / item.originalPrice * 100
          )}%</span>}


          <Tags items={item.tags}/>

              <div className='font-fair font-semibold text-xl'>
                {item.originalPrice
                  ? <div className='flex gap-4 items-center'>
                      <p className='text-hair line-through text-xl'>${item.originalPrice}</p>
                      <p className='text-3xl text-lux'>${item.price}</p>
                    </div>
                  : <p className='text-3xl text-lux'>${item.price}</p>
                }
              </div>
              <div className='flex gap-1.5 mt-1'>
                {item.colors.map((color, i) => (
                  <div
                    key={i}
                    title={color.name}
                    className='rounded-full h-4 w-4 border border-ink transition-colors'
                    style={{ background: color.hex }}
                  />
                ))}
              </div>
            </div>
</Link>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card