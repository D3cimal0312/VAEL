import Logo from "./Logo"

const Footer = () => {
  return (
    <div className=' bg-black text-cream-light font-fair overflow-hidden' >
        <div data-aos="fade-up"  data-aos-offet="50" className=" bg-black px-12 py-8 w-full h-full">
      <div className='flex justify-between gap-4'>
        <div className='flex flex-col gap-6'>
          <Logo />
          <p className='w-2/3 text-xl text-hair'>Wear What You Feel. VAEL is a quiet luxury fashion brand for those who dress with intention, not noise.</p>
          <div className="flex gap-16">
            <p>IG</p>
            <p>IG</p>
            <p>IG</p>
            <p>IG</p>
          </div>
        </div>

        <div className="flex justify-around w-1/3 font-sans">
          <div className='text-xl'>
            <h1 className="font-semibold text-cream mb-6">Help</h1>
            <div className="text-[18px] tracking-widest  flex flex-col text-hair font-sans">
             {["New In", "Women", "Men", "Accessories", "Sale"].map((item, index) => (
    <p className="linked mb-1 hover:text-lux transition-all duration-300 w-fit" key={index}>
      {item}
    </p>

))}

            </div>
          </div>

          <div className='text-xl'>
            <h1 className="font-semibold text-cream mb-6">Help</h1>
            <div className="text-[18px] tracking-widest  flex flex-col text-hair font-sans">
             {["Size Guides", "Returns", "Track Order", "Careers", "Contact Us"].map((item, index) => (
    <p className="linked mb-1 hover:text-lux transition-all duration-300 w-fit" key={index}>
      {item}
    </p>

))}

            </div>
          </div>
        </div>
      </div>

      <div id="divider" className='h-0.5 w-full bg-lux my-6' />

      <div className='flex justify-between'>
        <p>@2026 Vael. All rights reserved. Built with fingers dude</p>
        <div className='flex gap-8'>
          {["Khalti", "Esewa", "ImePay"].map((pay) => (
            <p key={pay} className=" text-cream-light bg-hair-dark px-2 py-1 rounded-md w-fit">
              {pay}
            </p>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Footer