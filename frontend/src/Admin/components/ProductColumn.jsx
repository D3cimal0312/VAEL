import React from "react";
import { useAdminProducts } from "../context/index";
import { productService } from "@/services/productService";
import StatusBadge from "@/Admin/common/StatusBadge";
import Paginationui from "@/common/Paginationui";

import { Pagination } from "@mantine/core";

const tableheadClass = "border border-hair px-4 py-2 text-left text-sm font-semibold";
const tableCellClass = "border border-hair px-4 py-3 text-sm";

const HEADERS = [
  "Product", "Name", "Description", "Material", "Sizing Info",
  "Price", "Category", "Gender", "Tags", "Colors", "Sizes",
  "Stock", "Features", "Status", "Rating", "Created", "Actions",
];

const ProductColumn = () => {
  const { products, loading, refetch, setProductId, open,page,totalPage,setPage } = useAdminProducts();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await productService.delete(id);
      refetch();
    }
  };

  const handleEdit = (id) => {
    setProductId(id);
    open();
  };

    const handlePageChange = (newPage) => {
  setPage(newPage);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  return (
    <div className="bg-cream-light p-6">

      {/* filters */}


      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-ink">Products</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-lux text-white rounded-lg hover:bg-lux/90 transition-colors font-medium text-sm"
        >
          Refresh
        </button>
      </div>

      {/* table */}
      <div className="overflow-x-auto max-h-[90vh] overflow-y-auto border border-hair rounded-lg">
        <table className="w-full border-collapse border border-hair">
          <thead className="bg-lux text-white sticky top-0">
            <tr>
              {HEADERS.map((h) => (
                <th key={h} className={tableheadClass}>{h}</th>
              ))}
            </tr>
          </thead>

          {products && products.length > 0 ? (
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-cream-light border-b border-hair">

                  {/* Image */}
                  <td className={tableCellClass}>
                    <img src={p.images?.[0]} alt={p.slug} className="w-16 h-20 object-cover rounded" />
                  </td>

                  {/* Name */}
                  <td className={tableCellClass}>
                    <div className="font-medium text-ink">{p.name}</div>
                    <div className="text-xs text-hair">{p.slug}</div>
                  </td>

                  {/* Description */}
                  <td className={`${tableCellClass} text-ink max-w-xs truncate`}>
                    {p.description}
                  </td>

                  {/* Material */}
                  <td className={`${tableCellClass} text-ink`}>{p.material || "-"}</td>

                  {/* Sizing Info */}
                  <td className={`${tableCellClass} text-ink`}>{p.sizingInfo || "-"}</td>

                  {/* Price */}
                  <td className={`${tableCellClass} font-medium text-lux`}>
                    {p.originalPrice && (
                      <span className="line-through text-hair mr-2">${p.originalPrice}</span>
                    )}
                    <span>${p.price}</span>
                  </td>

                  {/* Category */}
                  <td className={`${tableCellClass} text-ink`}>
                    {p.category?.name || p.category || "-"}
                  </td>

                  {/* Gender */}
                  <td className={tableCellClass}>
                    <span className="inline-block px-2 py-1 bg-lux/10 text-lux rounded text-xs font-semibold capitalize">
                      {p.gender}
                    </span>
                  </td>

                  {/* Tags */}
                  <td className={tableCellClass}>
                    <div className="flex flex-wrap gap-1">
                      {p.tags?.length > 0 ? p.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-cream-light border border-hair text-xs text-ink rounded">
                          {tag}
                        </span>
                      )) : <span className="text-hair text-xs">-</span>}
                    </div>
                  </td>

                  {/* Colors */}
                  <td className={tableCellClass}>
                    <div className="flex flex-wrap gap-2">
                      {p.colors?.length > 0 ? p.colors.map((color, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <span
                            className="w-5 h-5 rounded-full border border-hair/30"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                          <span className="text-xs text-ink hidden md:inline">{color.name}</span>
                        </div>
                      )) : <span className="text-hair text-xs">-</span>}
                    </div>
                  </td>

                  {/* Sizes */}
                  <td className={tableCellClass}>
                    <div className="flex gap-1">
                      {p.sizes?.length > 0 ? p.sizes.map((size, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 text-xs font-semibold rounded border ${
                            p.soldOut?.includes(size)
                              ? "bg-hair/10 text-hair border-hair line-through"
                              : "bg-white border-hair text-ink"
                          }`}
                        >
                          {size}
                        </span>
                      )) : <span className="text-hair text-xs">-</span>}
                    </div>
                  </td>

                  {/* Stock */}
                  <td className={tableCellClass}>
                     <span className={`px-2 py-1 rounded text-xs font-bold `}>
      {p.stock} units
    </span>
                  </td>

                  {/* Features */}
                  <td className={tableCellClass}>
                    <div className="flex flex-wrap gap-1">
                      {p.isNewArrival && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">New</span>
                      )}
                      {p.isSale && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">Sale</span>
                      )}
                      {!p.isNewArrival && !p.isSale && (
                        <span className="text-hair text-xs">-</span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className={tableCellClass}>
                    <StatusBadge value={p.status} />
                  </td>

                  {/* Rating */}
                  <td className={tableCellClass}>
                    <span className="font-semibold text-ink">{p.rating?.toFixed(1) || "0"}</span>
                    <span className="text-xs text-hair ml-1">({p.reviewCount || 0} reviews)</span>
                  </td>

                  {/* Created */}
                  <td className={`${tableCellClass} text-hair`}>
                    {p.createdAt?.split("T")[0]}
                  </td>

                  {/* Actions */}
                  <td className={tableCellClass}>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p._id)}
                        className="px-3 py-1 bg-green-400 text-white rounded-lg text-xs hover:bg-green-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={HEADERS.length} className="border border-hair px-4 py-6 text-center text-hair">
                  {loading ? "Loading products..." : "No products found. Create one to get started."}
                </td>
              </tr>
            </tbody>
          )}
        </table>
        
      </div>
<Paginationui totalPage={totalPage} page={page} onPageChange={handlePageChange} />

    </div>
  );
};

export default ProductColumn;