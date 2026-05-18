import Products from "../models/Products.js";
import Category from "../models/Category.js";
// handling post request
// !creating new product

export const createProduct = async (req, res) => {
  // console.log("BODY:", req.body);
  // console.log("FILES:", req.files);
  try {
    const imageURLS = req.files?.map((file) => file.path);

    const tags = JSON.parse(req.body.tags || "[]");
    const sizes = JSON.parse(req.body.sizes || "[]");
    const colors = JSON.parse(req.body.colors || "[]");
    const soldOut = JSON.parse(req.body.soldOut || "[]");

    const product = await Products.create({
      ...req.body,
      tags,
      sizes,
      soldOut,
      colors,
      images: imageURLS,
      category: req.body.category,
    });

    if (!product) {
      return res.status(404).json({ message: "Product creation failed" });
    }
    res.status(201).json({ data: product });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(e => e.message).join(", ");
      return res.status(400).json({ message });
    }
    if (err.code === 11000) {
      return res.status(400).json({ message: "A product with this slug already exists" });
    }
    res.status(500).json({ message: "Failed to create product" });
  }
};

// handling update product request

export const updateProduct = async (req, res) => {
  try {
    const imageURLS = req.files ? req.files.map((file) => file.path) : [];

    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    const colors = req.body.colors ? JSON.parse(req.body.colors) : [];
    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
    const soldOut = req.body.soldOut ? JSON.parse(req.body.soldOut) : [];

    //  if (req.body.category && !mongoose.Types.ObjectId.isValid(req.body.category)) {
    //   return res.status(400).json({ message: "Invalid category ID" });
    // }

    const updatedData = {
      ...req.body,
      tags,
      sizes,
      soldOut,
      colors,
      ...(imageURLS.length > 0 && { images: imageURLS }),
      category: req.body.category,
    };

    const product = await Products.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true },
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ data: product });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(e => e.message).join(", ");
      return res.status(400).json({ message });
    }
    if (err.code === 11000) {
      return res.status(400).json({ message: "A product with this slug already exists" });
    }
    res.status(500).json({ message: "Failed to update product" });
  }
};

// hadnling delete request

export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    // !current simple deleteing the object
    //

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "product has been succesffuly deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// getting the productts req all // by slug for users and  by if for admindashboard//

// !getting all products as per filter
// !draft and archieved are not shown in user end only on admin end
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      gender,
      isNewArrival,
      isSale,
      tags,
      sort = "createdAt",
      order = "desc",
      limit = 10,
      page = 1,
      q,
      status,
      stockStatus,
    } = req.query;

    let categoryId;
    if (category) {
      const categoryDoc = await Category.findOne({
        name: category.toLowerCase(),
      });
      if (categoryDoc) {
        categoryId = categoryDoc._id;
      }
    }
    const filter = {};

    if (gender) filter.gender = { $in: [gender.toLowerCase(), "unisex"] };
    if (categoryId) filter.category = categoryId;
    if (isNewArrival === "true") filter.isNewArrival = true;

    console.log(req.user);
    if (status) {
      if (req.user?.role !== "customer") {
        filter.status = status;
      } else {
        filter.status = "published";
      }
    } else {
      if (req.user?.role !== "admin") filter.status = "published";
    }

    if (isSale === "true") filter.isSale = true;

    console.log(filter, "");

    console.log(stockStatus, "filtered information");

    if (stockStatus === "low") {
      filter.stock = { $lte: 10 };
    } else if (stockStatus === "out") {
      filter.stock = 0;
    }

    if (tags) {
      filter.tags = {
        $in: tags.split(",").map((tag) => tag.trim().toLowerCase()),
      };
    }

    if (q) {
      // Search for products where ANY field contains the search term
      filter.$or = [
        { name: { $regex: q, $options: "i" } }, // Case insensitive
        { description: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { material: { $regex: q, $options: "i" } },
      ];
    }

    const allowedSorts = ["price", "rating", "createdAt"];

    const sortObj = {
      [allowedSorts.includes(sort) ? sort : "createdAt"]:
        order === "asc" ? 1 : -1,
    };

    console.log(filter);

    // !pagination
    const skip = (page - 1) * limit;

    let products = await Products.find(filter)
      .populate({ path: "category", select: "name" })
      .skip(skip)
      .limit(Number(limit))
      .sort(sortObj);

    // if (limit) {
    //   products = products.slice(0, parseInt(limit));
    // }

    const totalCount = await Products.countDocuments(filter);
    const totalPage = Math.ceil(totalCount / Number(limit));
    // console.log(totalPage,page,"total count",totalCount)

    res.status(200).json({ count: totalCount, totalPage, page, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const query =
      req.user?.role === "admin"
        ? { slug: req.params.slug }
        : { slug: req.params.slug, status: "published" };

    const product = await Products.findOne(query).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id)
      .populate("category")
      .lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // send  the id only so what no issue of object or string in front end later

    if (product.category?._id) {
      product.category = product.category._id;
    }

    res.status(200).json({ data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};