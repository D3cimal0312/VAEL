import React from 'react'

const Team = () => {
  const team = [
    { img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80', name: 'Aria Voss', role: 'Founder & Creative Director', bio: 'Aria spent a decade styling for editorial clients before founding VAEL. She built the brand on one belief — that beautiful clothes should outlast every season.' },
    { img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80', name: 'Lena Okafor', role: 'Head of Design', bio: 'Lena leads every collection from concept to final sample. Her process starts with the question: will this still feel right in five years? If the answers no, it does not ship.' },
    { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', name: 'Marco Reyes', role: 'Head of Sustainability', bio: 'Marco audits every supplier VAEL works with. He publishes the results annually, without exception. Accountability is not a value at VAEL — it is the baseline.' },
    { img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', name: 'James Tan', role: 'Creative Producer', bio: 'James shapes how VAEL is seen — from campaign direction to brand partnerships. His work makes the quiet confidence of VAEL visible to the world.' },
  ]

  return (
    <div className='my-12'>

      {/* ── MoBILE  (hidden on lg+) ── */}
      <div className='flex flex-col gap-10 px-5 lg:hidden'>
        {team.map((item, i) => {
          const isEven = i % 2 === 0
          return (
            <div
              key={i}
              className={`flex items-center gap-5 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              data-aos="fade-up"
              data-aos-delay={(i + 1) * 150}
              data-aos-duration="1000"
            >
              {/* rounded image */}
              <div className='shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-xl lg:rounded-full overflow-hidden'>
                <img
                  src={item.img}
                  alt={item.name}
                  className='w-full h-full object-cover'
                />
              </div>

              {/* text block */}
              <div className={`flex flex-col gap-1 ${isEven ? 'text-left' : 'text-right'}`}>
                <h2 className='font-fair text-2xl sm:text-3xl text-lux leading-tight'>
                  {item.name}
                </h2>
                <p className='italic text-base sm:text-lg text-lux/70'>
                  {item.role}
                </p>
                <p className='text-sm sm:text-base text-lux/60 font-fair mt-1 leading-snug'>
                  {item.bio}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ──  (hidden below lg) ── */}
      <div className='hidden lg:flex flex-wrap justify-around'>
        {team.map((item, i) => (
          <div
            key={i}
            className='bg-cream-light group rounded-full relative w-72 h-150 py-12 px-6 pb-16 flex flex-col items-center justify-between text-center'
            data-aos="fade-up"
            data-aos-delay={(i + 1) * 150}
            data-aos-duration="1000"
          >
            <div className='mt-4 relative z-20 text-lux group-hover:text-white transition-all duration-700 linear'>
              <h1 className='font-fair text-4xl mt-8'>
                {item.name}
              </h1>
              <p className='italic text-2xl'>{item.role}</p>
            </div>

            <img
              src={item.img}
              alt={item.name}
              className='absolute w-full h-[60%] object-cover rounded-full z-10
                top-[40%] group-hover:top-0
                group-hover:grayscale
                group-hover:h-[50%]
                transition-all duration-700 linear'
            />

            <p className='relative z-0 text-center text-lux font-fair transition-all duration-500 delay-300 ease-in-out text-xl'>
              {item.bio}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Team