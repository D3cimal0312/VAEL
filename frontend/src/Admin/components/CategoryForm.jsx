import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useCategories } from '../context';
import { categoryService } from '../services/adminCategoryService';
import { useCategory } from '../hooks/useApi';

const CategoryForm = () => {
  const [submitMessage, setSubmitMessage] = useState(null);

  const { refetch, categoryId, setCategoryId } = useCategories();
  const { category } = useCategory(categoryId);
console.log(category)
console.log(categoryId,"cat idf")
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      isActive: true,
    },
    validate: {
      name: (value) => {
        if (!value || !value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 20) return 'Name cannot exceed 20 characters';
        return null;
      },
      description: (value) => {
        if (!value || !value.trim()) return 'Description is required';
        if (value.trim().length < 5) return 'Description must be at least 5 characters';
        if (value.trim().length > 100) return 'Description cannot exceed 100 characters';
        return null;
      },
    },
  });

  // Populate form when editing an existing category
  useEffect(() => {
    if (category) {
      form.setValues({
        name: category.name || '',
        description: category.description || '',
        isActive: category.isActive ?? true,
      });
    }
  }, [category]);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (submitMessage) {
      const timer = setTimeout(() => setSubmitMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);

  const handleSubmit = async (values) => {
    try {
      // !making name lowercase so easier to deal with mongodb data
    const payload = {
      ...values,
      name: values.name?.toLowerCase?.() 
    };

      console.log(values,"form update values")

      if (categoryId) {
        await categoryService.update(categoryId, payload);
        setSubmitMessage({ text: 'Category updated successfully!' });
        setCategoryId(null);
      } else {
        await categoryService.create(payload);
        setSubmitMessage({ text: 'Category created successfully!' });
      }

      form.reset();
      refetch();
    } catch (err) {

      setSubmitMessage({ type: 'error', text: 'Error submitting category data.' });
    }
  };

  // Shared Tailwind class tokens — mirrors ProductForm conventions
  const inputClass =
    'w-full rounded-md border border-hair bg-white px-3 py-2 text-sm text-ink placeholder-hair focus:border-lux focus:outline-none focus:ring-1 focus:ring-lux transition-colors';
  const labelClass = 'block text-sm font-medium text-hair-dark mb-1';
  const sectionTitle = 'text-lg font-medium text-ink border-b border-hair/30 pb-2 mb-4';
  const errorClass = 'mt-1 text-xs text-red-500';

  return (
    <div className="bg-cream-light relative">
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-ink mb-6">
          {categoryId ? 'Edit Category' : 'Add New Category'}
        </h2>

        {/* TOAST */}
        {submitMessage && (
          <div
            className={`mb-6 p-4 rounded-md fixed z-40 right-10 top-2 ${
              submitMessage.type === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-green-50 text-green-800 border border-green-200'
            }`}
          >
            {submitMessage.text}
          </div>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <h3 className={sectionTitle}>Category Information</h3>

          <div className="mb-6">
            {/* Name */}
            <div className="mb-4">
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Tops, Accessories"
                {...form.getInputProps('name')}
              />
              {form.errors.name && <p className={errorClass}>{form.errors.name}</p>}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className={labelClass}>Description *</label>
              <textarea
                rows="4"
                className={inputClass}
                placeholder="Brief description of this category..."
                {...form.getInputProps('description')}
              />
              {form.errors.description && (
                <p className={errorClass}>{form.errors.description}</p>
              )}
            </div>

            {/* isActive toggle */}
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-lux rounded border-hair focus:ring-lux accent-lux"
                  {...form.getInputProps('isActive', { type: 'checkbox' })}
                />
                <span className="text-sm text-ink">Active (visible on storefront)</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="mb-4">
            <button
              type="submit"
              className="px-6 py-3 bg-lux text-white font-medium rounded-md hover:bg-lux-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lux focus:ring-offset-cream transition-colors"
            >
              {categoryId ? 'Update Category' : 'Save New Category'}
            </button>

            {/* Cancel edit — only shown when editing */}
            {categoryId && (
              <button
                type="button"
                onClick={() => {
                  setCategoryId(null);
                  form.reset();
                }}
                className="ml-3 px-6 py-3 border border-hair text-ink font-medium rounded-md hover:bg-cream-light focus:outline-none transition-colors text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;