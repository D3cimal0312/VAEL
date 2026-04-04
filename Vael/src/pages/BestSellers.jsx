import Heading from '../common/Heading'
import "aos/dist/aos.css";
import { useProducts } from '../hooks/GetProducts';

import Card from '../common/Card';
const BestSellers = () => {
    const { products, loading, error } = useProducts({
    sort:  'rating',
    order: 'desc',
    limit: 5,
  });

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;
  return (
    <div className='p-14 bg-cream-light overflow-x-hidden'>
        <div className='flex justify-between '>
            <Heading subheading={"curated For you"} mainheading={"Bestsellers"} />
        </div>


        <div className='w-full flex justify-between'>
    

    <Card products={products} limit={5} />
           


       

</div>
    </div>
  )
}

export default BestSellers