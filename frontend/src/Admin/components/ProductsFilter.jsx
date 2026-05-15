import React from "react";
import ClearAllbtn from "../common/ClearAllbtn";
import { useAdminProducts } from "../context/index"
import Searchbar from "../common/Searchbar";
import { SlidersHorizontal, LayoutGrid, Users, ArrowUpDown, Package, Tag } from "lucide-react";
import Label from "@/common/Label";
import IconSelect from "@/common/IconSelect";
const filterSelectClass =
  "border border-offwhite bg-cream-light text-hair-dark text-[13px] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lux transition-colors duration-100 cursor-pointer hover:border-hair w-full appearance-none";




const ProductFilter = () => {
  const { filters, updateFilter, clearFilters, categories } = useAdminProducts();

  return (
    <div className=" border border-offwhite rounded-xl px-5 py-4 my-3 mx-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-offwhite">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} strokeWidth={1.8} className="text-lux" />
          <h3 className="text-[13px] font-medium text-hair-dark tracking-wide uppercase">
            Filters
          </h3>
        </div>
        <ClearAllbtn clearFilters={clearFilters} />
      </div>

      {/* Row 1 — Search + primary selects */}
      <div className="flex flex-wrap items-end gap-4 mb-4">

        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <Label>Search</Label>
          <Searchbar
            updateFilter={updateFilter}
    
            filters={filters}
            placeHolder="Search products..."
          />
        </div>


        {/* Category */}
        <div className="min-w-[150px]">
          <Label>Category</Label>
          <IconSelect
            icon={LayoutGrid}
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </IconSelect>
        </div>


        {/* Gender */}
        <div className="min-w-[130px]">
          <Label>Gender</Label>
          <IconSelect
            icon={Users}
            value={filters.gender}
            onChange={(e) => updateFilter("gender", e.target.value)}
          >
            <option value="">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </IconSelect>
        </div>


        {/* Status */}
        <div className="min-w-[130px]">
          <Label>Status</Label>
          <IconSelect
            icon={Tag}
            value={filters.status}
            onChange={(e) => updateFilter("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </IconSelect>
        </div>


        {/* Stock */}
        <div className="min-w-[130px]">
          <Label>Stock</Label>
          <IconSelect
            icon={Package}
            value={filters.stockStatus}
            onChange={(e) => updateFilter("stockStatus", e.target.value)}
          >
            <option value="">All Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </IconSelect>
        </div>

      </div>

      {/* Row 2 — Sort + toggles */}
      <div className="flex flex-wrap items-end gap-4 pt-3 border-t border-offwhite">

        {/* Sort By */}
        <div className="min-w-[140px]">
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

        {/* Order */}
        <div className="min-w-[130px]">
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


        {/* Toggles */}
        <div className="flex items-center gap-6 self-end pb-[2px]">

          {/* New Arrival */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={filters.isNewArrival === "true"}
                onChange={(e) => updateFilter("isNewArrival", e.target.checked ? "true" : "")}
                className="sr-only peer"
              />
              <div className="w-8 h-4 rounded-full bg-offwhite border border-offwhite peer-checked:bg-lux transition-colors duration-150" />
              <div className="absolute top-[2px] left-[2px] w-3 h-3 rounded-full bg-hair peer-checked:bg-white peer-checked:translate-x-4 transition-all duration-150" />
            </div>
            <span className="text-[12px] text-hair group-hover:text-hair-dark transition-colors">New Arrival</span>
          </label>

          {/* On Sale */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={filters.isSale === "true"}
                onChange={(e) => updateFilter("isSale", e.target.checked ? "true" : "")}
                className="sr-only peer"
              />
              <div className="w-8 h-4 rounded-full bg-offwhite border border-offwhite peer-checked:bg-lux transition-colors duration-150" />
              <div className="absolute top-[2px] left-[2px] w-3 h-3 rounded-full bg-hair peer-checked:bg-white peer-checked:translate-x-4 transition-all duration-150" />
            </div>
            <span className="text-[12px] text-hair group-hover:text-hair-dark transition-colors">On Sale</span>
          </label>

        </div>
      </div>

    </div>
  );
};

export default ProductFilter;