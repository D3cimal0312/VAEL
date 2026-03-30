import {useParams} from 'react-router-dom'
import {FilterProducts} from  "../hooks/FilterProducts.js"
import Card from '../common/Card.jsx'
import Heading from '../common/Heading.jsx'
import Backgroundtag from '../components/Backgroundtag.jsx'

const DetailCatPage = () => {
    const config = {
  women:       { title1: "Women's ",title2: " Collection",  subtitle:'Women', filter: { gender: 'women' },          count: '84 ',description:'curated pieces designed for effortless living and quiet confidence.' },
  men:         { title1: "Men's", title2: " Collection",  subtitle:'Men', filter: { gender: 'men' },            count: '52 ',description:'curated pieces designed for effortless living and quiet confidence.' },
  newin :         { title1: "New ", title2: " Arrivals",    subtitle:'New',  filter: { isNew: true },             description:'The latest additions. Fresh in this week.' },
  accessories: { title1: "Accessories",  title2: " "   ,   subtitle:'Accessories', filter: { category: 'accessory' },    count: '36 ',description:'beautifully crafted pieces to complete any look.' },
  sale:        { title1: "Up to", title2: " 50% off"   ,           subtitle:'Sale', filter: { isSale: true },             description:'Limited time. Hand-picked favourites at exceptional prices.' },
}

    const {category}=useParams();
    const {title1,title2,subtitle,filter,count,description}=config[category];
    
    const products =FilterProducts(filter);

    return (

      // key={category} 
    <div   className='bg-cream-light '>

        <div  key={category}  className=' relative overflow-hidden h-[30vh] flex items-center mb-4 'data-aos='fade-up'>
      <Backgroundtag tag={subtitle}/>
  <div className='relative z-10 px-14 py-8'>
    <Heading subheading='Spring / Summer 2026' mainheading={title1} termheading={title2} lineup={true} motion={false} />
    <p className='text-hair text-2xl mt-2 tracking-wide font-cormorant'>{count} {description}</p>
  </div>
        </div>
 <div className='bg-white pt-2' >
        <Card products={products} key={category }/>
</div>

    </div>
  )
}

export default DetailCatPage