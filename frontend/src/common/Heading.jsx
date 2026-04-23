const Heading = ({ subheading , mainheading , termheading,macroheading, motion = true,lineup=false}) => {
  const aosProps = motion ? { 'data-aos': 'fade-up' } : {}
  const lineUp = lineup ? 'flex gap-2'  : {}


  return (
    <div {...aosProps} >
      <p className='text-lux uppercase tracking-widest mb-2'>{subheading}</p>
      <div className={lineUp}>
        <h2 className="font-cormorant text-6xl font-bold ">{mainheading}</h2>
        <h2 className="font-cormorant text-6xl font-bold italic text-lux">{termheading}</h2>
        <h2 className="font-cormorant text-4xl font-bold ">{macroheading}</h2>

      
      {/* {mainheading && (
        <h2 className="font-fair text-6xl font-bold">{mainheading}</h2>
      )}      
      
      {termheading && (
        <h2 className="font-fair text-6xl font-bold italic text-lux">{termheading}</h2>
      )}
            {macroheading && (
        <h2 className="font-fair text-4xl font-bold ">{macroheading}</h2>
      )} */}
    </div>
    </div>
  )
}

export default Heading