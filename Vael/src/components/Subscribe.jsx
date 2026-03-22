import React from 'react'
import Heading from '../common/Heading'

const Subscribe = () => {
  return ( 
    <div className='py-24 text-center bg-cream-light relative overflow-hidden'>
      
      <div className='absolute inset-0 flex items-center justify-center  z-0'>
        <h1 className='text-[480px] font-fair font-black text-cream  tracking-wider '>
          VAEL
        </h1>
      </div>

      <div className='relative z-10 flex flex-col gap-8'>
        <div>
          <Heading 
            subheading={"stay in the loop"} 
            mainheading={"The Edit,"} 
            termheading={"In Your Inbox"}
          />
        </div>

        <p className='text-hair text-xl'>
          Get weekly notes, get notified on new drops, and 15% off on your first order when you join
        </p>
    
        <div>
          <input
            type="email"
            placeholder='Your Email Address'
            name='email'
            className='px-6 border-2 border-r-0 py-4 md:w-100 outline-none focus:outline-none focus:ring-0 focus:border-black rounded-none'
          />
          <button className='px-8 border-2 outline-none border-black py-4 bg-black text-cream-light font-bold tracking-wider hover:bg-lux hover:border-lux transition-all duration-200 ease-linear'>
            SUBSCRIBE
          </button>
        </div>

        <p className='text-hair text-xl'>
          No spam ever, <a href="https://mail.google.com/mail/u/0/#search/vael" target="_blank">
            <span className='linked underline'>Unsubscribe anytime</span>
          </a>
        </p>
      </div>

    </div>
  ) 
}

export default Subscribe