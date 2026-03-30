import React, { useState,useEffect } from "react";
import { useParams } from "react-router";
import products from "../data/Productsdata.js";
import Heading from "../common/Heading.jsx";
import { Star, StarHalf, Minus, Plus,Heart } from "lucide-react";
import ImageMagnifier from "../hooks/ImageMagnifier.jsx";
import Animatebtn from "../common/Animatebtn.jsx";
import Accordion from "../common/Accordian.jsx";
import Card from "../common/Card.jsx";
import { FilterProducts } from "../hooks/FilterProducts.js";
import Tags from "../common/Tags.jsx";

import Quantity from "../common/Quantity.jsx";
const DetailedProduct = () => {

 
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

const [quantity,setQuantity]=useState(1)
  const full = Math.floor(product.rating) || 0;
  const decimal = (product.rating - full).toFixed(1) >= 0.5;
  const empty = 5 - full - (decimal ? 1 : 0);
  const [currentColor, setCurrentColor] = useState(product.colors[0].name);
  const [selectImage, setSelectImage] = useState(0);
const [selectSize, setSelectSize] = useState(
  product.sizes.find(size => !product.soldOut?.includes(size))
);

const similarProducts = FilterProducts({ tag: product.tags, excludeId: product.id })

   useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
const reset=()=>{
        setCurrentColor(product.colors[0].name)
      setSelectImage(0)
      setSelectSize(  product.sizes.find(size => !product.soldOut?.includes(size)))
}
reset();
  }, [id])


  if (!product) return <div>Product not found</div>;

  return (
    <div
      className="pl-12 xl:pl-0 xl:pr-14 pb-12  
    "
    >
      <div className="flex gap-24 font-fair flex-wrap xl:flex-nowrap ">
      <div id="imageSection" className=" flex-wrap md:flex-nowrap xl:sticky top-0  flex gap-4 h-fit items-center w-full xl:w-200">
 

        <div data-aos="fade-up">
          <ImageMagnifier imageSrc={product.images[selectImage]} />
          {/* <img src={product.images[selectImage]} alt="" className='h-[60vh] xl:w-[600px]' /> */}
        </div>
               <div className=" z-50 flex justify-center ml-4  flex-row md:absolute md:flex-col w-full md:w-fit gap-4  h-full ">
          {product.images.map((item, index) => (
            <div key={index} data-aos-delay={100+ index*100}
              data-aos="fade-right">
            <img
              src={item}
              className={` w-20 h-25 box-shadow-2xl rounded-sm ${index===selectImage?"border-2 border-lux":""}`}
              alt=""
              onClick={() => setSelectImage(index)}
              
            />
            </div>
          ))}
        </div>
      </div>
      <div id="imageinfo" className=" mt-12 flex flex-col gap-4 "  data-aos="fade-up">
        <Heading subheading={product.category} mainheading={product.name} motion={false} />
        <div className="flex  items-center gap-2  font-serif">
          <div id="rating" className="flex gap-0.5">
            {Array(full)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-amber-400 text-amber-400"
                />
              ))}

            {decimal && <StarHalf size={20} className="text-amber-400 fill-amber-400" />}

            {Array(empty)
              .fill(0)
              .map((_, i) => (
                <Star key={i} size={20} className="text-amber-400" />
              ))}
          </div>

          <p>{product.rating}</p>
          <p>{product?.reviews} Reviews</p>
        </div>
        <Tags items={product.tags}/>

        <div className="flex gap-4 relative items-end">
   {product.originalPrice && (
    <>
      <span className="text-hair line-through text-4xl">
        ${product.originalPrice}
      </span>
<p className="mb-5 -ml-6 text-green-600 text-3xl font-sans">
          -{Math.floor(
            (product.originalPrice - product.price)
            / product.originalPrice * 100
          )}%
</p>
    </>
  )}
          <p className="text-7xl text-lux">${product.price}</p>
        </div>

        <p className="text-hair tracking-wider ">
          {product.description}
        </p>

        <div>
          <p className="mb-2 tracking-wider font-serif">
            COLOR: <span className="text-hair">{currentColor}</span>
          </p>
          <div className="flex gap-2">
            {product.colors.map((color, i) => (
              <div
                key={i}
                title={color.name}
                className={`rounded-full h-8 w-8 border border-ink transition-colors
                    ${
                      color.name === currentColor
                        ? "scale-125 border-2 border-lux "
                        : ""
                    }`}
                style={{ background: color.hex }}
                onClick={() => setCurrentColor(color.name)}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-12 ">
          <div className="flex gap-4 items-center">
          <p className=" tracking-wider font-serif  text-xl">Sizes:</p>
          <div className="flex gap ">
{product.sizes.map((size, i) => {
  const isSoldOut = product.soldOut?.includes(size);
  return (
    <div
      key={i}
      className={`h-12 px-4 flex items-center justify-center transition-colors text-white
        ${isSoldOut
          ? "bg-gray-400 opacity-50 cursor-not-allowed line-through"
          : size === selectSize
            ? "bg-lux linked"
            : "bg-ink linked"
        }
      `}
      onClick={() => !isSoldOut && setSelectSize(size)}
    >
      {size}
    </div>
  );
})}
          </div>
          </div>
                  <div className="flex gap-4 items-center">
          <p className=" tracking-wider font-serif  text-xl">QTY:</p>
       <Quantity
                    quantity={quantity}
                    setQuantity={setQuantity}
                    />
          
        </div>
        </div>


        <div className=" flex  gap-1">
          
  <Animatebtn str={"Add to Cart"} className=""/>
  <div className="border-2 text-lux p-4 hover:bg-lux hover:text-white border-lux transition-all duration-150 ease-out ">
              <Heart/>
  </div>
</div>

<div>
  <Accordion    Q={"Materials"} A={product.material}/>

  <Accordion    Q={"Sizing Info"} A={product.sizingInfo}/>
</div>




      </div>
      </div>
      <div className=" ">
        <div className="pl-12 mt-12">
  <Heading subheading="Other Products" mainheading={"YOU MAY ALSO LIKE"} motion={false}/>
</div>
    <Card products={similarProducts} limit={10 } />
</div>
    </div>
  );
};

export default DetailedProduct;