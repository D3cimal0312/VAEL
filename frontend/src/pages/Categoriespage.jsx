import { Link } from "react-router-dom";
import Heading from "@/common/Heading";

const CATEGORIES = [
  {
    slug: "women",
    label: "Women",
    desc: "Effortless silhouettes for every occasion",
    num: "01",
    tag: "Collection",
    image:
      "https://plus.unsplash.com/premium_photo-1673758905772-e9f3ef20b354?q=80&w=687&auto=format&fit=crop",
  },
  {
    slug: "men",
    label: "Men",
    desc: "Refined essentials, quiet confidence",
    num: "02",
    tag: "Collection",
    image:
      "https://plus.unsplash.com/premium_photo-1688705098584-50f9a39176e3?q=80&w=687&auto=format&fit=crop",
  },
  {
    slug: "newin",
    label: "New In",
    desc: "Fresh this week",
    num: "03",
    tag: "Latest",
    image:
      "https://plus.unsplash.com/premium_photo-1695575593603-1f42ca27bb6d?q=80&w=1170&auto=format&fit=crop",
  },
  {
    slug: "accessories",
    label: "Accessories",
    desc: "The finishing touch",
    num: "04",
    tag: "Curated",
    image:
      "https://images.unsplash.com/photo-1621341103818-01dada8c6ef8?q=80&w=880&auto=format&fit=crop",
  },
  {
    slug: "sale",
    label: "Sale",
    count: "Up to 50% off",
    desc: "Hand-picked favourites, exceptional prices",
    num: "05",
    tag: "Limited",
    image:
      "https://images.unsplash.com/photo-1715678292272-5b68599825e0?q=80&w=687&auto=format&fit=crop",
  },
];

const CategoryCard = ({ cat, className = "" }) => (
  <Link
    to={`/category/${cat.slug}`}
    data-aos="fade-up"
    className={`group relative overflow-hidden flex flex-col justify-between cursor-pointer ${className}`}
  >
    <img
      src={cat.image}
      alt={cat.label}
      className="absolute  w-full h-full object-cover
                 grayscale-20 transition-all duration-700 ease-in-out
                 group-hover:grayscale-0 group-hover:scale-105"
    />


    <div className="relative z-10 flex justify-between items-start p-5">
      <span className="font-cormorant text-sm  uppercase text-cream">
        {cat.num}
      </span>
      <span className="text-[10px] tracking-[0.25em] uppercase text-white/60 border border-white/30 px-2 py-0.5">
        {cat.tag}
      </span>
    </div>


    <div className="relative z-10 p-5">

      <p
        className="text-[11px] tracking-widest uppercase text-white/70
                    opacity-0 translate-y-3
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-400 ease-out mb-3"
      >
        {cat.desc}
      </p>

      <div className="flex items-end justify-between">
        <h2 className="font-cormorant text-3xl sm:text-4xl   text-white">
          {cat.label}
        </h2>
        <span
          className="opacity-0 -translate-x-2
                         group-hover:opacity-100 group-hover:translate-x-0
                         transition-all duration-300 text-white text-lg"
        >
          →
        </span>
      </div>

      {cat.count && (
        <p className="font-cormorant text-sm text-cream mt-1 ">{cat.count}</p>
      )}
    </div>

    <div
      className="absolute bottom-0 left-0 h-[10px] w-0 bg-lux
                    group-hover:w-full transition-all duration-500 ease-out"
    />
  </Link>
);

const Categoriespage = () => {
  const [women, men, newin, accessories, sale] = CATEGORIES;

  return (
    <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
      <Heading
        subheading="shop by"
        mainheading="Browse "
        termheading="Categories"
        lineup={true}
        motion={false}
      />

      <div
        className="mt-10 grid gap-3
                      grid-cols-1 grid-rows-5
                      sm:grid-cols-2 sm:grid-rows-3
                      lg:grid-cols-3 lg:grid-rows-2
                      h-auto lg:h-[72vh]"
      >
        <CategoryCard
          cat={women}
          className="h-64 sm:h-auto lg:row-span-2 sm:col-span-2 lg:col-span-1"
        />
        <CategoryCard cat={men} className="h-64 sm:h-auto" />
        <CategoryCard cat={newin} className="h-64 sm:h-auto" />
        <CategoryCard cat={accessories} className="h-64 sm:h-auto" />
        <CategoryCard cat={sale} className="h-64 sm:h-auto" />
      </div>
    </div>
  );
};

export default Categoriespage;
