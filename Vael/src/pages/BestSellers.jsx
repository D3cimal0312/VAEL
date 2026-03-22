import Heading from '../common/Heading'
import "aos/dist/aos.css";
import products from '../data/Productsdata.js';

import Card from '../common/Card';
const BestSellers = () => {
  const producstsRatedHigh=products.filter((item)=>item.rating>4.6);
  return (
    <div className='p-14 bg-cream-light overflow-x-hidden'>
        <div className='flex justify-between '>
            <Heading subheading={"curated For you"} mainheading={"Bestsellers"} />
        </div>


        <div className='w-full flex justify-between'>
    

    <Card products={producstsRatedHigh} limit={5} />
           


       

</div>
    </div>
  )
}

export default BestSellers