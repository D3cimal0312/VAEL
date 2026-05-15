import Searchbar from "../common/Searchbar";
import ClearAllbtn from "../common/ClearAllbtn";
import { SlidersHorizontal, ShoppingCart, CreditCard, Info } from "lucide-react";

const STATUS_OPTIONS  = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
const PAYMENT_OPTIONS = ["unpaid", "paid", "refunded"];
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const filterSelectClass =
  "border border-offwhite bg-cream-light text-hair-dark text-xl rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lux transition-colors duration-100 cursor-pointer hover:border-hair w-full ";

const OrderFilter = ({ filters, updateFilter, clearFilters }) => {
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
      <div className="flex flex-wrap items-end gap-4">

        {/* Search */}
        <div className="flex-1 min-w-[220px]">
          <label className="text-[10px] font-medium uppercase  text-hair opacity-70 block mb-1.5">
            Search
          </label>
          <Searchbar
            updateFilter={updateFilter}

            filters={filters}
            placeHolder="Search by order ID or name"
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-offwhite self-end mb-[2px]" />

        {/* Order Status */}
        <div className="min-w-[160px]">
          <label className="text-[10px] font-medium uppercase  text-hair opacity-70 block mb-1.5">
            Order Status
          </label>
          <div className="relative">
            <ShoppingCart
              size={13}
              strokeWidth={1.8}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-hair pointer-events-none"
            />
            <select
              value={filters.status}
              onChange={(e) => updateFilter("status", e.target.value)}
              className={`${filterSelectClass} pl-8`}
            >
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{capitalize(s)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-offwhite self-end mb-[2px]" />

        {/* Payment Status */}
        <div className="min-w-[160px]">
          <label className="text-[10px] font-medium uppercase  text-hair opacity-70 block mb-1.5">
            Payment Status
          </label>
          <div className="relative">
            <CreditCard
              size={13}
              strokeWidth={1.8}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-hair pointer-events-none"
            />
            <select
              value={filters.paymentStatus}
              onChange={(e) => updateFilter("paymentStatus", e.target.value)}
              className={`${filterSelectClass} pl-8`}
            >
              <option value="">All Payments</option>
              {PAYMENT_OPTIONS.map((s) => (
                <option key={s} value={s}>{capitalize(s)}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 mt-4 pt-3 border-t border-offwhite">
        <Info size={13} strokeWidth={1.8} className="text-lux  shrink-0" />
        <p className="text-[11.5px] text-hair leading-snug">
          Searching by order number returns results regardless of other active filters.
        </p>
      </div>

    </div>
  );
};

export default OrderFilter;