import React from 'react'
import ClearAllbtn from '../common/ClearAllbtn'
import { SlidersHorizontal, Search, Shield } from 'lucide-react'
import Searchbar from '../common/Searchbar'

const ROLE_OPTIONS = [
  { value: "", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "customer", label: "Customer" },
]

const filterSelectClass =
  "border border-offwhite bg-cream-light text-hair-dark text-[13px] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lux transition-colors duration-100 cursor-pointer hover:border-hair w-full appearance-none"

const UsersFilter = ({ filter, updateFilter, clearFilters }) => {
  return (
    <div className="bg-white border border-offwhite rounded-xl px-5 py-4 mb-6">

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

      {/* Filter row */}
      <div className="flex flex-wrap items-end gap-4">

        {/* Search */}
        <div className="flex-1 min-w-[220px]">
          <label className="text-[10px] font-medium uppercase tracking-[0.08em] text-hair opacity-70 block mb-1.5">
            Search
          </label>
          <div className="relative">

             <Searchbar
            updateFilter={updateFilter}
            filterSelectClass={filterSelectClass}
            filters={filter}
            placeHolder="Search by name or email"
          />

          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-offwhite self-end mb-[2px]" />

        {/* Role */}
        <div className="min-w-[160px]">
          <label className="text-[10px] font-medium uppercase tracking-[0.08em] text-hair opacity-70 block mb-1.5">
            Role
          </label>
          <div className="relative">
            <Shield
              size={13}
              strokeWidth={1.8}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-hair pointer-events-none"
            />
            <select
              value={filter.role}
              onChange={(e) => updateFilter("role", e.target.value)}
              className={`${filterSelectClass} pl-8`}
            >
              {ROLE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UsersFilter