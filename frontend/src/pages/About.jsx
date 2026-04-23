import React, { useState } from 'react'
import Heading from '../common/Heading'
import Team from '../components/Team'
const pillars = [
  { num: '01', title: 'Origin', body: 'Every fabric traces back to a named source. We visit, audit, and publish results every year without exception.' },
  { num: '02', title: 'Craft', body: 'Small batch production in Portugal and Japan. Slow by design, never by accident.' },
  { num: '03', title: 'Longevity', body: 'We repair what we sell. Any VAEL piece, restored free of charge, for life.' },
  { num: '04', title: 'Accountability', body: 'B Corp certified 2022. Carbon-offset shipping. Zero unsold stock destroyed, ever.' },
]


const About = () => {


  return (
    <div className='px-12'>

      <div className='h-[50vh] flex flex-col justify-center items-center text-center'>
        <Heading subheading='ABOUT VAEL' mainheading='Not a brand' termheading='A position' />
        <p className='text-hair mt-2 lg:w-2/5' data-aos="fade-up">
          Vael was built on one belief — that beautiful clothes should outlast the season they were made for.
          Started in Lisbon in 2019, that has been the only rule we have never broken.
        </p>
      </div>

      <div>
        <Heading subheading='WHAT WE STAND FOR' mainheading='Four principles.' termheading='No exceptions' />
        <div className='mt-4'>
          {pillars.map((principle, index) => (
            <div
              key={index}
              className='flex gap-12 font-fair border-b-2 border-cream pb-2 pl-12 mt-2'
              data-aos="fade-up"
              data-aos-delay={(index+1) * 100}
              data-aos-offset="60"
            >
              <div className='text-2xl text-hair mt-1'>{principle.num}</div>
              <div>
                <h3 className='text-4xl mb-4 text-lux'>{principle.title}</h3>
                <p className='text-hair'>{principle.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="team" className='mt-24'>
        <Heading subheading='THE PEOPLE' mainheading='Small team,' termheading='Big convictions.' />

       <Team/>
      </div>

    </div>
  )
}

export default About