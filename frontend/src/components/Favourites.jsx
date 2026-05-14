import React from "react";
import { Link } from "react-router";
import RateStars from "@/common/RateStars";
import { Heart } from "lucide-react";

const Favourites = ({ items, loadings, count }) => {
  if (loadings) {
    return (
      <div className="bg-cream rounded-2xl p-8 h-fit flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-lux border-t-transparent rounded-full animate-spin" />
          <p className="text-lux font-fair text-lg opacity-60">Loading favourites...</p>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="bg-cream rounded-2xl p-4 sm:p-6 h-fit">
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-3xl sm:text-5xl text-lux font-fair">Favourites</h1>
          <span className="text-lux font-fair opacity-50 text-base sm:text-lg">{count} items</span>
        </div>
        <div className="h-fit flex flex-col items-center justify-center gap-3">
          <Heart color="#d4905a" fill="#d4905a" size={55} />
          <p className="text-lux font-fair text-2xl">No favourites yet</p>
          <Link
            to="/category/newin"
            className="text-lux font-fair underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream rounded-2xl p-4 sm:p-6">
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-3xl sm:text-5xl text-lux font-fair">Favourites</h1>
        <span className="text-lux font-fair opacity-50 text-base sm:text-lg">{items.length} items</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {items.map((item) => {
          const outOfStock = item.product.stock === 0;
          return (
            <Link
              to={`/products/${item.product.slug}`}
              key={item.product._id}
              className={`group bg-cream-light rounded-xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-out ${outOfStock ? "opacity-50" : ""}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {outOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="opacity-100 text-cream text-xs font-fair bg-ink px-2 py-0.5 rounded-lg whitespace-nowrap">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-0.5 p-2">
                <h2 className="text-lux font-fair text-xs leading-tight line-clamp-1">
                  {item.product.name}
                </h2>
                <div className="flex font-serif items-center gap-1"><RateStars rating={Number(item.product.rating)} /> {item.product.rating}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lux font-fair text-lg sm:text-xl">
                    ${item.product.price}
                  </span>
                  {item.product.stock > 0 && (
                    <span className="text-red-500 text-xs">
                      Stock: {item.product.stock}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Favourites;