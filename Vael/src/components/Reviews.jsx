import Heading from '../common/Heading'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../index.css'
import { MessageSquareQuote } from 'lucide-react'


const Reviews = () => {
const comments = [
  {
    customerName: "Sophia Laurent",
    customerID: 101,
    customerRating: 5,
    comment: "I wore the Silk Cami Dress to three different occasions and got compliments every time. The quality is unlike anything I've found at this price point."
  },
  {
    customerName: "Mia Thompson",
    customerID: 102,
    customerRating: 5,
    comment: "Finally a brand that gets quiet luxury right. VAEL's linen pieces have become my entire warm-weather wardrobe. Effortlessly chic, always comfortable."
  },
  {
    customerName: "James Reid",
    customerID: 103,
    customerRating: 4,
    comment: "Packaging was stunning, delivery was fast, and the blazer fits like it was tailored for me. I'll be recommending VAEL to everyone I know."
  },
  {
    customerName: "Amara Osei",
    customerID: 104,
    customerRating: 5,
    comment: "The merino knit set is absolutely worth every penny. Soft, structured, and so versatile. I've worn it dressed up and dressed down all week."
  },
  {
    customerName: "Elena Vasquez",
    customerID: 105,
    customerRating: 5,
    comment: "VAEL understands what modern women actually want to wear. Nothing feels overdone. Everything just works together beautifully."
  },
  {
    customerName: "Noah Kimura",
    customerID: 106,
    customerRating: 4,
    comment: "Ordered the linen overshirt and it arrived within three days. The fabric is exceptional — light but structured. Exactly what I was looking for."
  },
  {
    customerName: "Isla Mackenzie",
    customerID: 107,
    customerRating: 5,
    comment: "I'm very picky about fabric and VAEL never disappoints. The wrap dress drapes beautifully and the colour is even richer in person."
  },
  {
    customerName: "Lucas Moreau",
    customerID: 108,
    customerRating: 4,
    comment: "Clean aesthetic, great quality, fast shipping. The tailored trousers fit perfectly off the rack which almost never happens for me."
  },
]
  return (
    <div className='p-14 '>
        <Heading subheading={"Customer Love"} mainheading={"What They Say"} termheading={"About Us"} />
        

        
<div id="comment" className='pt-12' data-aos="fade-up">



      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation

        breakpoints={{
          640:  { slidesPerView: 1 },
          768:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
  style={{
    '--swiper-navigation-color': '#d4905a',  
    '--swiper-navigation-size': '42px',   


  }}
      >
        {comments.map((review, i) => (
          <SwiperSlide key={i}>
            <div  className="p-8 px-12 min-h-72 flex flex-col gap-4 rounded-xl bg-cream-light" >
                <MessageSquareQuote  className='text-lux-light  ' size={54}/>
              <div className="text-yellow-400 text-2xl">
                {'★'.repeat(review.customerRating)}{'☆'.repeat(5 - review.customerRating)}
              </div>

        
              <p className="text-black font-cormorant text-xl leading-9 flex-1 " >
                "{review.comment}"
              </p>

              <p  className="text-black font-cormorant text-2xl flex-1  font-semibold">
                — {review.customerName}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  
</div>

    </div>
  )
}

export default Reviews