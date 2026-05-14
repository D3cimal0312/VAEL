import React from "react";
import { Star, StarHalf } from "lucide-react";
const RateStars = ({rating}) => {
  const full = Math.floor(rating) || 0;
  const decimal = (rating - full).toFixed(1) >= 0.5;
  const empty = 5 - full - (decimal ? 1 : 0);
  return (
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
      {decimal && (
        <StarHalf size={20} className="text-amber-400 fill-amber-400" />
      )}
      {Array(empty)
        .fill(0)
        .map((_, i) => (
          <Star key={i} size={20} className="text-amber-400" />
        ))}
    </div>
  );
};

export default RateStars;
