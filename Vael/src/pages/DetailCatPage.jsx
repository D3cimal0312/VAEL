import {useParams} from 'react-router-dom'
import {FilterProducts} from  "../hooks/FilterProducts.js"
import Card from '../common/Card.jsx'
const DetailCatPage = () => {
    const config = {
  women:       { title: "Women's Collection", filter: { gender: 'women' },          count: '84 pieces' },
  men:         { title: "Men's Collection",   filter: { gender: 'men' },            count: '52 pieces' },
  newin:         { title: "New Arrivals",       filter: { isNew: true },              count: 'Just landed' },
  accessories: { title: "Accessories",        filter: { category: 'accessory' },    count: '36 pieces' },
  sale:        { title: "Sale",               filter: { isSale: true },             count: 'Up to 50% off' },
}

    const {category}=useParams();
    const {title,filter,count}=config[category];
    
    const products =FilterProducts(filter);

    return (
    <div>

 
        <Card products={products} key={category }/>


    </div>
  )
}

export default DetailCatPage