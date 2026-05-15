import React from "react";

import { Search } from "lucide-react";
const Searchbar = ({
  updateFilter,

  filters,
  placeHolder,
}) => {
  const filterSelectClass =
  "border border-offwhite bg-cream-light text-hair-dark text-xl rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lux transition-colors duration-100 cursor-pointer hover:border-hair w-full ";
  return (
    <div className="relative mr-4 w-full">

                    <Search
                      size={16}
                      strokeWidth={2}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-hair pointer-events-none"
                    />
                    
      <input
        type="text"
        value={filters.q}
        onChange={(e) => updateFilter("q", e.target.value)}
        placeholder={placeHolder}
        className={`${filterSelectClass} pl-8 w-full `}
        
      />
    </div>
  );
};

export default Searchbar;
