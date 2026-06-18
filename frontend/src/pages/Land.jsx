import React, { useState, useEffect } from "react";

import { servicelist, featuresdata } from "@/data/servicelist";
import { Hexagon } from "lucide-react";
import Marquee from "react-fast-marquee";
import Categoriespage from "@/pages/Categoriespage";
import BestSellers from "@/pages/BestSellers";
import Reviews from "@/components/Reviews";
import Subscribe from "@/components/Subscribe";
import Animatebtn from "@/common/Animatebtn";
import { Link } from "react-router";
import { FeaturedProductSkeleton } from "@/components/ui/Skeletons";
import { useProducts } from "@/hooks/products/useProducts";
import Tags from "@/common/Tags";

const Land = () => {
  const { products, loading, error } = useProducts({
    sort: "createdAt",
    order: "desc",
    limit: 4,
  });
  const [landdesc, setLanddesc] = useState({
    tag: "SPRING / SUMMER 2025",
    description:
      "VAEL blends quiet luxury with effortless wearability. Elevated essentials crafted for the way you actually live.",
  });
  const servicelists = [...servicelist, ...servicelist];

  console.log(products, "dasdas");
  return (
    <>
   
      <div className="text-hair bg-black py-4 h-14 overflow-hidden ">
        <Marquee>
          {servicelists.map((item, index) => (
            <div key={index} className="flex gap-8 items-center">
              <div className="max-w-fit whitespace-nowrap ml-8 uppercase">
                {item}
              </div>
              <Hexagon size={12} color={"#d4905a"} fill={"#d4905a"} />
            </div>
          ))}
        </Marquee>
      </div>
      <div className="pl-8 md:grid grid-cols-2 gap-y-12  overflow-hidden mb-16">
        <section
          className=" mt-16 flex flex-col gap-y-4 w-full lg:w-4/5 md:pl-8"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-3 text-lux">
            <span className="shrink-0 w-6 sm:w-10 h-0.5 bg-lux" />
            <span className="whitespace-nowrap text-sm sm:text-base md:text-xl tracking-widest">
              {landdesc.tag}
            </span>
          </div>

          <h1 className="text-7xl lg:text-8xl xl:text-9xl font-fair font-bold leading-tight">
            <span className="block whitespace-nowrap">Wear What</span>
            <span className="block whitespace-nowrap">
              You <span className="text-lux italic">Feel.</span>
            </span>
          </h1>
          <p className="text-hair text-xl w-full">
            {landdesc.description} {landdesc.description}
          </p>
          <div id="land" className="btndiv flex items-center gap-x-8">
            <Link
              to={"https://youtu.be/dZrXCy9Isgg?si=vSC2ZyZ9QEgz-mqt"}
              target="_blank"
            >
              <div className="w-74 tracking-[5px]">
                <Animatebtn str={"Brand Story"} />
              </div>
            </Link>
          </div>
          <div className="h-0.5 w-[115%] bg-lux" />

          <div className="flex flex-wrap gap-12 items-center font-fair mt-4">
            {featuresdata.map((item, index) => (
              <div
                key={index}
                className="uppercase flex  flex-col justify-between gap-2"
                data-aos="fade-up"
                data-aos-delay={`${100 + (index + 1) * 100}`}
                data-aos-offset="60"
              >
                <div className="flex items-center gap-1 font-fair text-4xl h-10 ">
                  <p className="">{item.value}</p>
                  {item.title === "avg rating" && (
                    <span className="text-4xl relative bottom-3 text-lux hover:text-lux-light">
                      ★
                    </span>
                  )}
                </div>
                <div className="whitespace-nowrap text-2xl text-hair ">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside
          className="flex justify-end w-0 h-0 md:w-auto md:h-auto"
          data-aos="fade-left"
        >

          <div className=" hidden md:grid lg:grid-cols-2 gap-2 md:h-[calc(100vh-100px-56px)] md:w-4/5  overflow-hidden">
            
            
            { loading ? <FeaturedProductSkeleton /> : products.map((item, index) => (
              <div
                className="bg-lux-light   overflow-hidden group "
                key={index}
              >
                <Link to={`/products/${item.slug}`}>
                  <div className="relative overflow-hidden h-full w-full">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-full w-full object-cover object-center
               grayscale-40 transition-all duration-400 ease-in-out
               group-hover:grayscale-0 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 text-sm  bottom-6 flex justify-center group-hover:-translate-y-2  transition-all duration-400 ease-in-out ">
                      <Tags items={item.tags} color="white" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <Categoriespage />
      <BestSellers />
      <Reviews />
      <Subscribe />
    </>
  );
};

export default Land;
