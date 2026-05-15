import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Heading from "@/common/Heading.jsx";
import { Star, StarHalf, Heart } from "lucide-react";
import ImageMagnifier from "@/hooks/ImageMagnifier.jsx";
import Animatebtn from "@/common/Animatebtn.jsx";
import Accordion from "@/common/Accordian.jsx";
import Card from "@/common/Card.jsx";
import Tags from "@/common/Tags.jsx";
import Quantity from "@/common/Quantity.jsx";
import { useProducts, useProduct } from "@/hooks/products/useProducts.js";
import {
  ProductCardSkeleton,
  ProductDetailSkeleton,
} from "@/components/ui/Skeletons.jsx";

import RateStars from "@/common/RateStars";

import useCart from "@/hooks/carts/useCarts";


import useFavourite from "@/hooks/favourites/useFavourites";

const DetailedProduct = () => {



    const { toggleFavourite, isFavourite } = useFavourite();
  

  const {addToCart} = useCart();
  const { slug } = useParams();

  const { product, loading } = useProduct(slug);
 const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState(null);
  const [selectImage, setSelectImage] = useState(0);
  const [selectSize, setSelectSize] = useState(null);


  const { products: similarProducts } = useProducts({
    tags: product?.tags?.join(","),
    limit: 5,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (product) {
      setCurrentColor(product.colors[0]);
      setSelectImage(0);
      setSelectSize(
        product.sizes?.find((size) => !product.soldOut?.includes(size)),
      );
    }
  }, [slug, product]);

  if (loading)
    return (
      <div>
        <ProductDetailSkeleton />
        <ProductCardSkeleton />
      </div>
    );

  if (!product) return <p>Product not found</p>;



  
  return (
    <div className="  px-4 sm:px-8 md:px-12 lg:px-16 xl:pl-0 xl:pr-14 pb-12">
      <div className="flex gap-24 font-fair flex-wrap xl:flex-nowrap">
        <div
          id="imageSection"
          className="flex-wrap md:flex-nowrap xl:sticky top-0 flex gap-4 h-fit items-center w-full xl:w-200"
        >
          <div data-aos="fade-up" className="w-full">
            <ImageMagnifier imageSrc={product.images[selectImage]} />
          </div>
          <div className="z-50 flex justify-center ml-4 flex-row md:absolute md:flex-col w-full md:w-fit gap-4 h-full">
            {product.images.map((item, index) => (
              <div
                key={index}
                data-aos-delay={100 + index * 100}
                data-aos="fade-right"
              >
                <img
                  src={item}
                  className={`w-20 h-25 box-shadow-2xl rounded-sm ${index === selectImage ? "border-2 border-lux" : ""}`}
                  alt=""
                  onClick={() => setSelectImage(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          id="imageinfo"
          className="mt-12 flex flex-col gap-4 w-full"
          data-aos="fade-up"
        >
          <Heading
            subheading={product.category?.name}
            mainheading={product.name}
            motion={false}
          />

          <div className="flex items-center gap-2 font-serif">
 <RateStars rating={Number(product.rating)}/>
 
            <p>{product.rating}</p>
            <p>{product?.reviews} Reviews</p>
          </div>

          <Tags items={product.tags} />

          <div className="flex gap-4 relative items-end">
            {product.originalPrice && (
              <>
                <span className="text-hair line-through text-4xl">
                  ${product.originalPrice}
                </span>
                <p className="mb-5 -ml-6 text-green-600 text-3xl font-sans">
                  -
                  {Math.floor(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )}
                  %
                </p>
              </>
            )}
            <p className="text-7xl text-lux">${product.price}</p>
          </div>

          <p className="text-hair tracking-wider">{product.description}</p>

          <div>
            <p className="mb-2 tracking-wider font-serif">
              Color: <span className="text-hair">{currentColor?.name}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((color, i) => (
                <div
                  key={i}
                  title={color.name}
                  className={`rounded-full h-8 w-8 border border-ink transition-colors
                    ${color.name === currentColor ? "scale-125 border-2 border-lux" : ""}`}
                  style={{ background: color.hex }}
                  onClick={() => setCurrentColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-12">
            <div className="flex gap-4 items-center">
              <p className="tracking-wider font-serif text-xl">Sizes:</p>
              <div className="flex gap">
                {product.sizes.map((size, i) => {
                  const isSoldOut = product.soldOut?.includes(size);
                  return (
                    <div
                      key={i}
                      className={`h-12 px-4 flex items-center justify-center transition-colors text-white
                        ${
                          isSoldOut
                            ? "bg-gray-400 opacity-50 cursor-not-allowed line-through"
                            : size === selectSize
                              ? "bg-lux linked"
                              : "bg-ink linked"
                        }`}
                      onClick={() => !isSoldOut && setSelectSize(size)}
                    >
                      {size}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <p className="tracking-wider font-serif text-xl">QTY:</p>
              <Quantity quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>

          <div className="flex gap-1">
            <div className="w-full" onClick={()=>{addToCart(product,quantity,currentColor,selectSize)}}>
            <Animatebtn str={"Add to Cart"} />
            </div>
            <button onClick={() => toggleFavourite(product)} className="border-2 text-lux p-4 hover:bg-lux hover:text-white border-lux transition-all duration-150 ease-out">
              <Heart fill={isFavourite(product._id) ? "#d4905a" : "white"} size={isFavourite(product._id) ? "28" : "22"} />
            </button>
          </div>

          <div>
            <Accordion Q={"Materials"} A={product.material} />
            <Accordion Q={"Sizing Info"} A={product.sizingInfo} />
          </div>
        </div>
      </div>

      <div>
        <div className="pl-12 mt-12">
          <Heading
            subheading="Other Products"
            mainheading={"YOU MAY ALSO LIKE"}
            motion={false}
          />
        </div>
        <Card products={similarProducts} limit={5} />
      </div>
    </div>
  );
};

export default DetailedProduct;
