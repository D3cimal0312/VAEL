import React from "react";
import { useCategories } from "../context/index";
import { categoryService } from '../services/adminCategoryService';

const CategoryColumn = () => {
  const { categories, loading, refetch, setCategoryId } = useCategories();

console.log(categories)
  return (
    <div className="overflow-x-auto bg-cream-light p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-ink">Categories</h2>
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
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">ID</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Slug</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Description</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Status</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Created</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Updated</th>
            <th className="border border-hair px-4 py-2 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        {categories && categories.length > 0 ? (
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-cream-light border-b border-hair">
                {/* ID */}
                <td className="border border-hair px-4 py-3 text-xs text-hair font-mono">
                  {category._id.slice(-8)}
                </td>

                {/* Name */}
                <td className="border border-hair px-4 py-3 text-sm">
                  <div className="font-semibold text-ink">{category.name}</div>
                </td>

                {/* Slug */}
                <td className="border border-hair px-4 py-3 text-sm text-ink">
                  <code className="bg-cream px-2 py-1 rounded text-xs">{category.slug}</code>
                </td>

                {/* Description */}
                <td className="border border-hair px-4 py-3 text-sm text-ink max-w-sm truncate">
                  {category.description || '-'}
                </td>

                {/* Status (isActive) */}
                <td className="border border-hair px-4 py-3 text-sm">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    category.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {category.isActive ? '✓ Active' : '✗ Inactive'}
                  </span>
                </td>

                {/* Created Date */}
                <td className="border border-hair px-4 py-3 text-xs text-hair">
                  {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : '-'}
                </td>

                {/* Updated Date */}
                <td className="border border-hair px-4 py-3 text-xs text-hair">
                  {category.updatedAt ? new Date(category.updatedAt).toLocaleDateString() : '-'}
                </td>

                {/* Actions */}
                <td className="border border-hair px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-xs"
                      onClick={() => setCategoryId(category._id)}
                    >
                      Edit
                    </button>
  
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="8" className="border border-hair px-4 py-6 text-center text-hair">
                No categories found. Create one to get started.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default CategoryColumn;