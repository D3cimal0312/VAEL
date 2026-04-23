import { useState, useEffect } from 'react';
import { useForm } from "@mantine/form";
import { useAdminCategories, useProduct } from '../hooks/useApi';
import { productService } from '../services/adminProductService';
import { useProducts } from '../context';

const ProductForm = () => {
  const { refetch, productId, setProductId } = useProducts();
  const { product } = useProduct(productId);
  const { categories } = useAdminCategories();
  const [submitMessage, setSubmitMessage] = useState(null);

  // ─── Form ────────────────────────────────────────────────────────────────────
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      material: '',
      sizingInfo: '',
      price: '',
      originalPrice: '',
      category: '',
      gender: 'unisex',
      tags: [],
      colors: [],
      sizes: [],
      soldOut: [],
      stock: '',
      isNewArrival: false,
      isSale: false,
      status: 'draft',
      rating: '',
      reviewCount: '',
      // Helper fields (skipped on submit)
      images: [],
      tagInput: '',
      colorInput: { name: '', hex: '#000000' },
      sizeInput: '',
    },
    validate: {
      name: (value) => (!value?.trim() ? 'Name is required' : null),

      description: (value) => (!value?.trim() ? 'Description is required' : null),

      price: (value) => {
        if (value === '' || value === null || value === undefined) return 'Price is required';
        if (isNaN(value)) return 'Price must be a valid number';
        if (Number(value) < 0) return 'Price cannot be negative';
        return null;
      },

      originalPrice: (value) => {
        if (!form.values.isSale) return null;
        if (value === '' || value === null || value === undefined) return 'Original price is required when on sale';
        if (isNaN(value)) return 'Original price must be a valid number';
        if (Number(value) < 0) return 'Original price cannot be negative';
        if (Number(value) <= Number(form.values.price)) return 'Original price must be greater than sale price';
        return null;
      },

      stock: (value) => {
        if (value === '' || value === null || value === undefined) return 'Stock is required';
        if (isNaN(value)) return 'Stock must be a valid number';
        if (Number(value) < 0) return 'Stock cannot be negative';
        return null;
      },

      category: (value) => (!value ? 'Category is required' : null),

      rating: (value) => {
        if (value === '' || value === null || value === undefined) return null;
        const num = Number(value);
        if (isNaN(num) || num < 0 || num > 5) return 'Rating must be between 0 and 5';
        return null;
      },

      reviewCount: (value) => {
        if (value === '' || value === null || value === undefined) return null;
        const num = Number(value);
        if (isNaN(num) || num < 0) return 'Review count cannot be negative';
        return null;
      },
    },
  });

  // ─── Populate form on edit ────────────────────────────────────────────────────
  useEffect(() => {
    if (product) {
      form.setValues({
        name: product.name || '',
        description: product.description || '',
        material: product.material || '',
        sizingInfo: product.sizingInfo || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        category: typeof product.category === 'object' ? product.category?._id : product.category || '',
        gender: product.gender || 'unisex',
        tags: product.tags || [],
        colors: product.colors || [],
        sizes: product.sizes || [],
        soldOut: product.soldOut || [],
        stock: product.stock || '',
        isNewArrival: product.isNewArrival || false,
        isSale: product.isSale || false,
        status: product.status || 'draft',
        rating: product.rating || '',
        reviewCount: product.reviewCount || '',
        // Reset helpers
        images: [],
        tagInput: '',
        colorInput: { name: '', hex: '#000000' },
        sizeInput: '',
      });
    }
  }, [product]);

  // ─── Toast auto-dismiss ───────────────────────────────────────────────────────
  useEffect(() => {
    if (submitMessage) {
      const t = setTimeout(() => setSubmitMessage(null), 5000);
      return () => clearTimeout(t);
    }
  }, [submitMessage]);

  // ─── Handlers ─────────────────────────────────────────────────────────────────
  const handleAddTag = () => {
    const tag = form.values.tagInput.trim();
    if (tag && !form.values.tags.includes(tag)) {
      form.setFieldValue('tags', [...form.values.tags, tag]);
    }
    form.setFieldValue('tagInput', '');
  };

  const handleAddColor = () => {
    const { name, hex } = form.values.colorInput;
    if (!name.trim()) {
      form.setFieldError('colorInput', 'Color name is required');
      return;
    }
    if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)) {
      form.setFieldError('colorInput', 'Invalid hex color');
      return;
    }
    form.setFieldValue('colors', [...form.values.colors, { name: name.trim(), hex }]);
    form.setFieldValue('colorInput', { name: '', hex: '#000000' });
  };

  const handleAddSize = () => {
    const size = form.values.sizeInput.trim().toUpperCase();
    if (size && !form.values.sizes.includes(size)) {
      form.setFieldValue('sizes', [...form.values.sizes, size]);
    }
    form.setFieldValue('sizeInput', '');
  };

  const toggleSoldOut = (size) => {
    const current = form.values.soldOut;
    form.setFieldValue(
      'soldOut',
      current.includes(size) ? current.filter(s => s !== size) : [...current, size]
    );
  };
const handleSubmit = async (values) => {
  try {
    const formData = new FormData();

    const skipFields = ['tagInput', 'colorInput', 'sizeInput', 'images',"category"];
    const jsonFields = ['tags', 'colors', 'sizes', 'soldOut'];
// categoru goes with objid
formData.append('category', values.category);

    Object.entries(values).forEach(([key, value]) => {
      if (skipFields.includes(key)) return;
      if (jsonFields.includes(key)) {
        formData.append(key, JSON.stringify(value));
        return;
      }
      formData.append(key, value);
    });

    // Handle images separately
    if (values.images?.length > 0) {
      values.images.forEach(img => formData.append('images', img));
    }

    // Debug — confirm data is there
    for (let [key, val] of formData.entries()) {
      console.log(key, val);
    }

    if (productId) {
      await productService.update(productId, formData);
      setSubmitMessage({ text: 'Product updated successfully!' });
      setProductId(null);
    } else {
      await productService.create(formData);
      setSubmitMessage({ text: 'Product created successfully!' });
    }

    form.reset();
    refetch();
  } catch (err) {
    console.error('Product submission error:', err);
    setSubmitMessage({
      type: 'error',
      text: err.message || 'Failed to save product',
    });
  }
};

  // ─── Styles ───────────────────────────────────────────────────────────────────
  const inputClass = "w-full rounded-md border border-hair bg-white px-3 py-2 text-sm text-ink placeholder-hair focus:border-lux focus:outline-none focus:ring-1 focus:ring-lux transition-colors";
  const labelClass = "block text-sm font-medium text-hair-dark mb-1";
  const sectionTitle = "text-lg font-medium text-ink border-b border-hair/30 pb-2 mb-4 mt-8";
  const errorClass = "text-red-500 text-xs mt-1";

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="bg-cream-light relative min-h-screen">

      {/* Toast */}
      {submitMessage && (
        <div className={`fixed z-50 right-6 top-4 p-4 rounded-md shadow-md border ${
          submitMessage.type === 'error'
            ? 'bg-red-50 text-red-800 border-red-200'
            : 'bg-green-50 text-green-800 border-green-200'
        }`}>
          {submitMessage.text}
        </div>
      )}

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-ink mb-6">
          {productId ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">

          {/* ── BASIC INFORMATION ─────────────────────────────── */}
          <h3 className={sectionTitle}>Basic Information</h3>

          {/* Name */}
          <div>
            <label className={labelClass}>Name *</label>
            <input type="text" placeholder="Product Name" className={inputClass} {...form.getInputProps('name')} />
            {form.errors.name && <p className={errorClass}>{form.errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description *</label>
            <textarea rows={4} placeholder="Product Description" className={inputClass} {...form.getInputProps('description')} />
            {form.errors.description && <p className={errorClass}>{form.errors.description}</p>}
          </div>

          {/* Material */}
          <div>
            <label className={labelClass}>Material</label>
            <input type="text" placeholder="Cotton, Polyester..." className={inputClass} {...form.getInputProps('material')} />
          </div>

          {/* Sizing Info */}
          <div>
            <label className={labelClass}>Sizing Info</label>
            <input type="text" placeholder="Runs true to size..." className={inputClass} {...form.getInputProps('sizingInfo')} />
          </div>

          {/* ── CATEGORY & PRICING ────────────────────────────── */}
          <h3 className={sectionTitle}>Category & Pricing</h3>

          {/* Category */}
          <div>
            <label className={labelClass}>Category *</label>
            <select className={inputClass} {...form.getInputProps('category')}>
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c._id} value={c._id} disabled={!c.isActive}>
                  {c.name}{!c.isActive ? ' (inactive)' : ''}
                </option>
              ))}
            </select>
            {form.errors.category && <p className={errorClass}>{form.errors.category}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className={labelClass}>Gender</label>
            <select className={inputClass} {...form.getInputProps('gender')}>
              <option value="unisex">Unisex</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className={labelClass}>Price *</label>
            <input type="number" step="0.01" min="0" className={inputClass} {...form.getInputProps('price')} />
            {form.errors.price && <p className={errorClass}>{form.errors.price}</p>}
          </div>

          {/* Original Price (only if on sale) */}
          {form.values.isSale && (
            <div>
              <label className={labelClass}>Original Price (before sale) *</label>
              <input type="number" step="0.01" min="0" className={inputClass} {...form.getInputProps('originalPrice')} />
              {form.errors.originalPrice && <p className={errorClass}>{form.errors.originalPrice}</p>}
            </div>
          )}

          {/* Stock */}
          <div>
            <label className={labelClass}>Stock Quantity *</label>
            <input type="number" min="0" className={inputClass} {...form.getInputProps('stock')} />
            {form.errors.stock && <p className={errorClass}>{form.errors.stock}</p>}
          </div>

          {/* ── TAGS ──────────────────────────────────────────── */}
          <h3 className={sectionTitle}>Tags</h3>

          <div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={form.values.tagInput}
                onChange={e => form.setFieldValue('tagInput', e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                placeholder="Type a tag and press Enter"
                className={inputClass}
              />
              <button type="button" onClick={handleAddTag} className="px-4 py-2 bg-lux text-white rounded-md text-sm hover:bg-lux/90 transition-colors whitespace-nowrap">
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.values.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-hair text-xs text-ink">
                  {tag}
                  <button type="button" onClick={() => form.setFieldValue('tags', form.values.tags.filter(t => t !== tag))} className="text-hair hover:text-red-500 ml-1">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* ── COLORS ────────────────────────────────────────── */}
          <h3 className={sectionTitle}>Colors</h3>

          <div>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Color name (e.g. Navy)"
                className={inputClass}
                value={form.values.colorInput.name}
                onChange={e => form.setFieldValue('colorInput', { ...form.values.colorInput, name: e.target.value })}
              />
              <input
                type="color"
                className="h-10 w-14 rounded border border-hair bg-white p-0.5 cursor-pointer"
                value={form.values.colorInput.hex}
                onChange={e => form.setFieldValue('colorInput', { ...form.values.colorInput, hex: e.target.value })}
              />
              <button type="button" onClick={handleAddColor} className="px-4 py-2 bg-lux text-white rounded-md text-sm hover:bg-lux/90 transition-colors">
                Add
              </button>
            </div>
            {form.errors.colorInput && <p className={errorClass}>{form.errors.colorInput}</p>}
            <div className="flex flex-wrap gap-2">
              {form.values.colors.map((c, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-light border border-hair text-xs text-ink">
                  <span className="w-3 h-3 rounded-full border border-hair/30" style={{ backgroundColor: c.hex }} />
                  {c.name}
                  <button type="button" onClick={() => form.setFieldValue('colors', form.values.colors.filter((_, i) => i !== idx))} className="text-hair hover:text-red-500">×</button>
                </span>
              ))}
            </div>
          </div>

          {/* ── SIZES & SOLD OUT ───────────────────────────────── */}
          <h3 className={sectionTitle}>Sizes</h3>

          <div>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="e.g. S, M, XL, 42"
                className={inputClass}
                value={form.values.sizeInput}
                onChange={e => form.setFieldValue('sizeInput', e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSize(); } }}
              />
              <button type="button" onClick={handleAddSize} className="px-4 py-2 bg-lux text-white rounded-md text-sm hover:bg-lux/90 transition-colors">
                Add
              </button>
            </div>
            <p className="text-xs text-hair mb-2">Click a size to mark it as sold out · × to remove</p>
            <div className="flex flex-wrap gap-2">
              {form.values.sizes.map((s, i) => (
                <span
                  key={i}
                  onClick={() => toggleSoldOut(s)}
                  className={`px-3 py-1 rounded text-sm cursor-pointer border border-hair select-none ${
                    form.values.soldOut.includes(s)
                      ? 'bg-hair/10 line-through text-hair'
                      : 'bg-white text-ink hover:bg-cream-light'
                  }`}
                >
                  {s}
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); form.setFieldValue('sizes', form.values.sizes.filter((_, idx) => idx !== i)); }}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* ── IMAGES ────────────────────────────────────────── */}
          <h3 className={sectionTitle}>Images</h3>

          <div>
            <label className={labelClass}>Product Images (max 4)</label>
            <p className="text-xs text-hair mb-2">Select up to 4 images at once</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={e => {
                const files = Array.from(e.target.files || []);
                if (files.length > 4) {
                  form.setFieldError('images', 'Maximum 4 images allowed');
                  return;
                }
                form.setFieldValue('images', files);
                form.clearFieldError('images');
              }}
              className="block w-full text-sm text-hair-dark file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-lux file:text-white hover:file:bg-lux/90"
            />
            {form.errors.images && <p className={errorClass}>{form.errors.images}</p>}
            {form.values.images.length > 0 && (
              <p className="mt-2 text-sm text-hair">{form.values.images.length} file(s) selected</p>
            )}
          </div>

          {/* ── FLAGS & STATUS ─────────────────────────────────── */}
          <h3 className={sectionTitle}>Flags & Status</h3>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-lux rounded border-hair"
                {...form.getInputProps('isNewArrival', { type: 'checkbox' })}
              />
              <span className="text-sm text-ink">Mark as New Arrival</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-lux rounded border-hair"
                {...form.getInputProps('isSale', { type: 'checkbox' })}
              />
              <span className="text-sm text-ink">Mark as On Sale</span>
            </label>
          </div>

          <div>
            <label className={labelClass}>Visibility Status</label>
            <select className={inputClass} {...form.getInputProps('status')}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* ── RATINGS ────────────────────────────────────────── */}
          <h3 className={sectionTitle}>Ratings (optional)</h3>

          <div>
            <label className={labelClass}>Rating (0–5)</label>
            <input type="number" min={0} max={5} step="0.1" className={inputClass} {...form.getInputProps('rating')} />
            {form.errors.rating && <p className={errorClass}>{form.errors.rating}</p>}
          </div>

          <div>
            <label className={labelClass}>Review Count</label>
            <input type="number" min={0} className={inputClass} {...form.getInputProps('reviewCount')} />
            {form.errors.reviewCount && <p className={errorClass}>{form.errors.reviewCount}</p>}
          </div>

          {/* ── SUBMIT ─────────────────────────────────────────── */}
          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-lux text-white font-medium rounded-md hover:bg-lux/90 focus:outline-none focus:ring-2 focus:ring-lux focus:ring-offset-2 transition-colors"
            >
              {productId ? 'Update Product' : 'Save New Product'}
            </button>

            {productId && (
              <button
                type="button"
                onClick={() => { setProductId(null); form.reset(); }}
                className="px-6 py-3 border border-hair text-ink font-medium rounded-md hover:bg-hair/10 transition-colors"
              >
                Cancel Edit
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProductForm;