import React from "react";
import { useProducts } from "../context/index";
import { productService } from '../services/adminProductService';

const ProductColumn = () => {
  const { products, loading, refetch,setProductId } = useProducts()
  
const handleDelete=async(id)=>{
  if (window.confirm('Are you sure you want to delete this product?')) {
   await productService.delete(id);
   refetch();
  }
      
}
  return (
    <div className="overflow-x-auto bg-cream-light p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-ink">Products</h2>
        <button 
          onClick={() => refetch()}
          className="px-4 py-2 bg-lux text-white rounded-lg hover:bg-lux/90 transition-colors font-medium text-sm"
        >
          Refresh
        </button>
      </div>
      <table className="w-full border-collapse border border-hair">
        <thead className="bg-lux text-white">
          <tr>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Product</th> 
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Description</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Material</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Sizing Info</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Price</th> 
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Category</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Gender</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Tags</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Colors</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Sizes</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Stock</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Features</th> 
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Status</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Rating</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Created</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Actions</th>
            
          </tr>
        </thead> 
        {
          products && products.length>0 ?
          ( 
          <tbody>
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-cream-light border-b border-hair">
              {/* Product Image */}
              <td className="border border-hair px-4 py-3">
                <img src={p.images?.[0]} alt={p.slug} className="w-16 h-20 object-cover rounded" />
              </td>

              {/* Name & Slug */}
              <td className="border border-hair px-4 py-3 text-sm">
                <div className="font-medium text-ink">{p.name}</div>
                <div className="text-xs text-hair">{p.slug}</div>
              </td>

              {/* Description */}
              <td className="border border-hair px-4 py-3 text-sm text-ink max-w-xs truncate">
                {p.description}
              </td>

              {/* Material */}
              <td className="border border-hair px-4 py-3 text-sm text-ink">
                {p.material || '-'}
              </td>

              {/* Sizing Info */}
              <td className="border border-hair px-4 py-3 text-sm text-ink">
                {p.sizingInfo || '-'}
              </td>

              {/* Price */}
              <td className="border border-hair px-4 py-3 text-sm font-medium text-lux">
                {p.originalPrice && (
                  <span className="line-through text-hair mr-2">${p.originalPrice}</span>
                )}
                <span>${p.price}</span>
              </td>

              {/* Category */}
              <td className="border border-hair px-4 py-3 text-sm text-ink">
                {p.category?.name || p.category || '-'}
              </td>

              {/* Gender */}
              <td className="border border-hair px-4 py-3 text-sm">
                <span className="inline-block px-2 py-1 bg-lux/10 text-lux rounded text-xs font-semibold capitalize">
                  {p.gender}
                </span>
              </td>

              {/* Tags */}
              <td className="border border-hair px-4 py-3 text-sm">
                <div className="flex flex-wrap gap-1">
                  {p.tags?.length > 0 ? (
                    p.tags.map((tag, idx) => (
                      <span key={idx} className="inline-block px-2 py-0.5 bg-cream-light border border-hair text-xs text-ink rounded">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-hair text-xs">-</span>
                  )}
                </div>
              </td>

              {/* Colors */}
              <td className="border border-hair px-4 py-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  {p.colors?.length > 0 ? (
                    p.colors.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span 
                          className="w-5 h-5 rounded-full border border-hair/30" 
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        ></span>
                        <span className="text-xs text-ink hidden md:inline">{color.name}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-hair text-xs">-</span>
                  )}
                </div>
              </td>

              {/* Sizes */}
              <td className="border border-hair px-4 py-3 text-sm">
                <div className="flex flex-wrap gap-1">
                  {p.sizes?.length > 0 ? (
                    p.sizes.map((size, idx) => (
                      <span 
                        key={idx} 
                        className={`px-2 py-0.5 text-xs font-semibold rounded border ${
                          p.soldOut?.includes(size)
                            ? 'bg-hair/10 text-hair border-hair line-through'
                            : 'bg-white border-hair text-ink'
                        }`}
                      >
                        {size}
                      </span>
                    ))
                  ) : (
                    <span className="text-hair text-xs">-</span>
                  )}
                </div>
              </td>

              {/* Stock */}
              <td className="border border-hair px-4 py-3 text-sm font-semibold">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  p.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : p.stock > 0 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {p.stock} units
                </span>
              </td>

              {/* Features (isNew & isSale) */}
              <td className="border border-hair px-4 py-3 text-sm">
                <div className="flex flex-wrap gap-1">
                  {p.isNewArrival && (
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      🆕 New
                    </span>
                  )}
                  {p.isSale && (
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                      🔥 Sale
                    </span>
                  )}
                  {!p.isNewArrival && !p.isSale && (
                    <span className="text-hair text-xs">-</span>
                  )}
                </div>
              </td>

              {/* Status */}
              <td className="border border-hair px-4 py-3 text-sm">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  p.status === 'published' 
                    ? 'bg-green-100 text-green-800'
                    : p.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {p.status}
                </span>
              </td>

              {/* Rating & Review Count */}
              <td className="border border-hair px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-ink">{p.rating?.toFixed(1) || '0'}</span>
                  <span className="text-xs text-hair">({p.reviewCount || 0} reviews)</span>
                </div>
              </td>

              {/* Created Date */}
              <td className="border border-hair px-4 py-3 text-sm text-hair">
                {p.createdAt}
              </td>

                            <td className="border border-hair px-4 py-3 text-sm text-hair">
                <span className=" p-2 bg-green-400 text-white rounded-xl" 
                onClick={()=>setProductId(p._id)}>Edit</span>
                <span
                className=" p-2 bg-red-600 text-white rounded-xl ml-4" 
                onClick={()=>handleDelete(p._id)}>Delete</span>
              </td>
            </tr>
          ))}
        </tbody> ):
        <tbody>
            <tr>
              <td colSpan="8" className="border border-hair px-4 py-6 text-center text-hair">
                No products found. Create one to get started.
              </td>
            </tr>
        </tbody>
        }
        
      </table>
    </div>
  );
};

export default ProductColumn;