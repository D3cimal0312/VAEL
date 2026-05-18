import Category from "../models/Category.js";

// !creating new category
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (!category)
      return res.status(404).json({ message: "Category creation failed" });
    res.status(200).json({ data: category });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(e => e.message).join(", ");
      return res.status(400).json({ message });
    }
    if (err.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};

// !handling update category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ data: category });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(e => e.message).join(", ");
      return res.status(400).json({ message });
    }
    if (err.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};

// !getting all category
export const getAllCategory = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const sortDirection = req.query.order === "desc" ? -1 : 1;

    const categories = await Category.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ name: sortDirection });

    const totalCount = await Category.countDocuments();
    const totalPage = Math.ceil(totalCount / Number(limit));

    // console.log(totalCount,"totalCount")

    if (categories.length === 0)
      return res.status(200).json({ message: "no data found" });

    res.status(200).json({ data: categories, totalPage, count: totalCount, page: Number(page) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// !getting a single category
export const getCategoryById = async (req, res) => {
  try {
    const singlecategory = await Category.findById(req.params.id);

    if (!singlecategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ data: singlecategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

export const simpleCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).select("name isActive");

    if (!categories)
      return res.status(404).json({ message: "No categories found" });

    res.status(200).json({ data: categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};