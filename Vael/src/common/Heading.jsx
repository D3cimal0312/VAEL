const Heading = ({ subheading = "View", mainheading , termheading, motion = true }) => {
  const aosProps = motion ? { 'data-aos': 'fade-up' } : {}

  return (
    <div {...aosProps}>
      <p className='text-lux uppercase tracking-widest mb-2'>{subheading}</p>
      {mainheading && (
        <h2 className="font-fair text-6xl font-bold">{mainheading}</h2>
      )}      
      
      {termheading && (
        <h2 className="font-fair text-6xl font-bold mt-2 italic text-lux">{termheading}</h2>
      )}
    </div>
  )
}

export default Heading