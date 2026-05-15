import React from 'react'
import ClearAllbtn from "../common/ClearAllbtn";
import Searchbar from '../common/Searchbar';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const CategoryFilter = ({ filters, updateFilter, clearFilters }) => {
  const filterSelectClass =
    "border border-offwhite bg-cream-light text-hair-dark text-[13px] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lux transition-colors duration-100 cursor-pointer hover:border-hair";

  return (
    <div className="bg-white border border-offwhite rounded-xl px-5 py-4 mb-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-offwhite">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} strokeWidth={1.8} className="text-lux" />
          <h3 className="text-[13px] font-medium text-hair-dark  uppercase">
            Filters
          </h3>
        </div>
        <ClearAllbtn clearFilters={clearFilters} />
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-end justify-between">

        {/* Search */}
        <div className="flex-1 min-w-[320px]">
          <label className="text-xl font-medium uppercase  text-hair opacity-70 mb-1.5">
            Search
          </label>
          <Searchbar
            updateFilter={updateFilter}

            filters={filters}
            placeHolder="Search by name or description"
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-offwhite self-end mb-[2px]" />

        {/* Sort */}
        <div className="min-w-[180px]">
          <label className="text-xl font-medium uppercase  text-hair opacity-70 block mb-1.5">
            Sort by
          </label>
          <div className="relative">
            <ArrowUpDown
              size={13}
              strokeWidth={1.8}
              className="absolute left-3 top-1/2  text-hair   -translate-y-1/2 pointer-events-none"
            />
            <select
              value={filters.order || "asc"}
              onChange={(e) => updateFilter("order", e.target.value)}
              className={`${filterSelectClass} pl-8 w-full appearance-none`}
            >
              <option value="asc">A → Z (Ascending)</option>
              <option value="desc">Z → A (Descending)</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CategoryFilter;