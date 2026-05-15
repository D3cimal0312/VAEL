import Heading from "@/common/Heading";
import "aos/dist/aos.css";
import { useProducts } from "@/hooks/products/useProducts";

import Card from "@/common/Card";
import { ProductCardSkeleton } from "@/components/ui/Skeletons";
const BestSellers = () => {
  const { products, loading } = useProducts({
    sort: "rating",
    order: "desc",
    limit: 5,
  });

  if (loading) <ProductCardSkeleton limit={5} />;

  return (
    <div className="p-14 bg-cream-light overflow-x-hidden ">
      <div className="flex justify-between ">
        <Heading subheading={"curated For you"} mainheading={"Bestsellers"} />
      </div>

      <div className="w-full flex justify-between ">
        <Card products={products} />
      </div>
    </div>
  );
};

export default BestSellers;
