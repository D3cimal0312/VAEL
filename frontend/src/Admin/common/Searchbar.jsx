import React from "react";

import { Search } from "lucide-react";
const Searchbar = ({
  updateFilter,
  filterSelectClass,
  filters,
  placeHolder,
}) => {
  return (
    <div className="relative mr-4">

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
