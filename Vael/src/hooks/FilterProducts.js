// FilterProducts.js
import products from "../data/Productsdata.js"

export const FilterProducts = (filters = {}) => {
  return products.filter((p) => {
    if (filters.excludeId && p.id === filters.excludeId) return false
    if (filters.gender    && p.gender !== filters.gender) return false
    if (filters.isNew     && !p.isNew)                   return false
    if (filters.isSale    && !p.isSale)                  return false

    if (filters.tag) {
      const filterTags = Array.isArray(filters.tag) ? filters.tag : [filters.tag]
      return filterTags.some(tag => p.tags.includes(tag))
    }

    return true
  })
}