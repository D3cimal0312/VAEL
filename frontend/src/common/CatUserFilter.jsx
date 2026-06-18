import React from 'react'
import {SlidersHorizontal, LayoutGrid, Users, ArrowUpDown, Package, Tag} from "lucide-react";
import ClearAllbtn from "../Admin/common/ClearAllbtn";
import Searchbar from '@/Admin/common/Searchbar';

import IconSelect from './IconSelect';
import Label from './Label';

const CatUserFilter = ({filters,setFilters}) => {
    const clearFilters = () => {
  setFilters({
    q: '',
    sort: 'createdAt',
    order: 'desc',
  });
};

 const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  




  return (
    <div className='mx-6 my-2  pt-4 px-12 bg-white'>


              <div className="flex justify-between items-center mb-4 pb-3 border-b border-offwhite">
        <div className="flex flex-wrap gap-2   md:justify-between w-full items-center">
           <div className='flex flex-wrap gap-6 justify-between '>
            <div className='flex items-center  gap-6 mr-8'>
          <SlidersHorizontal size={15} strokeWidth={1.8} className="text-lux" />
          <h3 className="text-md  text-hair-dark  uppercase">
            Filters
          </h3>
</div>
       <div className="flex  items-center gap-4  md:w-[300px] xl:w-[500px]">
          <Label>Search</Label>
          <Searchbar
            updateFilter={updateFilter}
   
            filters={filters}
            placeHolder="Search products..."
          />
        </div>

      <div className="flex  items-center gap-4 ">
          <Label>Sort By</Label>
          <IconSelect
            icon={ArrowUpDown}
            value={filters.sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
          >
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </IconSelect>
        </div>

      <div className="flex  items-center gap-4 ">

                  <Label>Order</Label>
                  <IconSelect
                    icon={ArrowUpDown}
                    value={filters.order}
                    onChange={(e) => updateFilter("order", e.target.value)}
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </IconSelect>
                </div>

        </div>

        <ClearAllbtn clearFilters={clearFilters} />
       

        </div>
      </div>

    </div>
  )
}

export default CatUserFilter