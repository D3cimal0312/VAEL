import { useParams } from "react-router-dom";
import { useProducts } from "@/hooks/products/useProducts.js";
import Card from "@/common/Card.jsx";
import { useEffect } from "react";
import Heading from "@/common/Heading.jsx";
import Backgroundtag from "@/components/Backgroundtag.jsx";
import { Banner, ProductCardSkeleton } from "@/components/ui/Skeletons.jsx";
import Paginationui from "@/common/Paginationui";

const DetailCatPage = () => {
{/* ── curate data── */}

  const config = {
    women: {
      title1: "Women's ",
      title2: " Collection",
      subtitle: "Women",
      filter: { gender: "women" },
   
      description:
        "curated pieces designed for effortless living and quiet confidence.",
    },
    men: {
      title1: "Men's",
      title2: " Collection",
      subtitle: "Men",
      filter: { gender: "men" },
      
      description:
        "curated pieces designed for effortless living and quiet confidence.",
    },
    newin: {
      title1: "New ",
      title2: " Arrivals",
      subtitle: "New",
      filter: { isNewArrival: true },
      description: "The latest additions. Fresh in this week.",
    },
    accessories: {
      title1: "Accessories",
      title2: " ",
      subtitle: "Accessories",
      filter: { category: "accessory" },
     
      description: "beautifully crafted pieces to complete any look.",
    },
    sale: {
      title1: "Up to",
      title2: " 50% off",
      subtitle: "Sale",
      filter: { isSale: true },
      description:
        "Limited time. Hand-picked favourites at exceptional prices.",
    },
  };

  const { category } = useParams();
  const { title1, title2, subtitle, filter, count, description } =
    config[category];


  //  const { products, loading, error } = useProducts({filter});

  const { products, loading ,totalPage,page ,setPage } = useProducts(filter);
  console.log(products,count,totalPage,page)

useEffect(() => {
  setPage(1); 
}, [category]);

  const handlePageChange = (newPage) => {
  setPage(newPage);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  if (loading)
    return (
      <div>
        {" "}
        <Banner /> <ProductCardSkeleton />{" "}
      </div>
    );

  return (
    <div className="bg-cream-light ">
      <div
        key={category}
        className=" relative overflow-hidden h-[30vh] flex items-center mb-4 "
        data-aos="fade-up"
      >
        <Backgroundtag tag={subtitle} />
        <div className="relative z-10 px-14 py-8">
          <Heading
            subheading="Spring / Summer 2026"
            mainheading={title1}
            termheading={title2}
            lineup={true}
            motion={false}
          />
          <p className="text-hair text-2xl mt-2 tracking-wide font-cormorant">
            {count} {description}
          </p>
        </div>
      </div>
      <div className="bg-white pt-2">
        <Card products={products} key={category} />
      </div>

      <Paginationui totalPage={totalPage} page={page}   onPageChange={handlePageChange} />
    </div>
  );
};

export default DetailCatPage;
