import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useCategories } from "../context";
import { categoryService } from "@/services/categoryService";
import { useAdminCategory } from "@/hooks/categories/useAdminCategories";

import { Modal } from "@mantine/core";

import Heading from "@/common/Heading";
import toast from "react-hot-toast";

const CategoryForm = () => {
  const { modalOpen, open, close, refetch, categoryId, setCategoryId } =
    useCategories();
  const { category } = useAdminCategory(categoryId);
  console.log(category, "category");
  console.log(categoryId, "cat idf");
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      isActive: true,
    },
    validate: {
      name: (value) => {
        if (!value || !value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        if (value.trim().length > 20) return "Name cannot exceed 20 characters";
        return null;
      },
      description: (value) => {
        if (!value || !value.trim()) return "Description is required";
        if (value.trim().length < 5)
          return "Description must be at least 5 characters";
        if (value.trim().length > 100)
          return "Description cannot exceed 100 characters";
        return null;
      },
    },
  });
  console.log(category, "category");

  useEffect(() => {
    if (category) {
      form.setValues({
        name: category.name || "",
        description: category.description || "",
        isActive: category.isActive ?? true,
      });
    }
  }, [category]);

  const handleSubmit = async (values) => {
    try {
      // !making name lowercase so easier to deal with mongodb data
      const payload = {
        ...values,
        name: values.name?.toLowerCase?.(),
      };

      console.log(values, "form update values");

      if (categoryId) {
        await categoryService.update(categoryId, payload);
        toast.success("Category updated successfully!");
        close();
        setCategoryId(null);
      } else {
        await categoryService.create(payload);
        toast.success("Category created successfully!'");
        close();
      }

      form.reset();
      refetch();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create/update category",
      );
    }
  };

  // Shared Tailwind class tokens — mirrors ProductForm conventions
  const inputClass =
    "w-full rounded-md border border-hair bg-white px-3 py-2 text-sm text-ink placeholder-hair focus:border-lux focus:outline-none focus:ring-1 focus:ring-lux transition-colors";
  const labelClass = "block text-sm font-medium text-hair-dark mb-1";
  const sectionTitle =
    "text-lg font-medium text-ink border-b border-hair/30 pb-2 mb-4";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <div className="bg-cream-light relative font-fair">
      <div className="flex items-center justify-between">
        <Heading
          mainheading={"Categories"}
          subheading={"Manage your categories"}
        />
        <button
          onClick={() => {
            form.reset();
            open();
          }}
          className="bg-lux ml-4 mt-4 text-white px-4 py-2 rounded-md hover:bg-lux-dark transition-colors"
        >
          Add New Category
        </button>
      </div>

      <Modal
        size={"65%"}
        opened={modalOpen}
        onClose={close}
        centered
        title="Category Info"
      >
        <div className="max-w-5xl mx-auto p-6">
          <h2 className="text-3xl font-semibold text-ink mb-6">
            {categoryId ? "Edit Category" : "Add New Category"}
          </h2>

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
                  {...form.getInputProps("name")}
                />
                {form.errors.name && (
                  <p className={errorClass}>{form.errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className={labelClass}>Description *</label>
                <textarea
                  rows="4"
                  className={inputClass}
                  placeholder="Brief description of this category..."
                  {...form.getInputProps("description")}
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
                    {...form.getInputProps("isActive", { type: "checkbox" })}
                  />
                  <span className="text-sm text-ink">
                    Active (visible on storefront)
                  </span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="mb-4">
              <button
                type="submit"
                className="px-6 py-3 bg-lux text-white font-medium rounded-md hover:bg-lux-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lux focus:ring-offset-cream transition-colors"
              >
                {categoryId ? "Update Category" : "Save New Category"}
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
      </Modal>
    </div>
  );
};

export default CategoryForm;
