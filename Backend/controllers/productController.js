import Products from "../models/Products.js";
import Category from "../models/Category.js";
// handling post request
// !creating new product

export const createProduct = async (req, res) => {
  // console.log("BODY:", req.body);
  // console.log("FILES:", req.files);
  try {
    const imageURLS = req.files?.map((file) => file.path);

      const tags    = JSON.parse(req.body.tags    || "[]");
    const sizes   = JSON.parse(req.body.sizes   || "[]");

    const colors  = JSON.parse(req.body.colors  || "[]");

    const soldOut = JSON.parse(req.body.soldOut || "[]");

    console.log("error")


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
      return res.status(404).json({
        message: "Product creation issue",
      });
    }
    res.status(201).json({ data: product });
  } catch (err) {
    console.log(err)

    res.status(400).json({ message: err.message });
  }
};

// handling update product request

export const updateProduct = async (req, res) => {
  try {
        const imageURLS = req.files ? req.files.map((file) => file.path) : [];
    
    const tags    = req.body.tags ? JSON.parse(req.body.tags) : [];
    const colors  = req.body.colors ? JSON.parse(req.body.colors) : [];
    const sizes   = req.body.sizes ? JSON.parse(req.body.sizes) : [];
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
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        message: "product was not found",
      });
    }
    res.status(200).json({ data: product });
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message });
  }
};

// hadnling delete request

export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    // !current simple deleteing the object
    //

    if (!product) {
      return res.status(404).json({ message: "Product not found to delete" });
    }

    res.status(200).json({ message: "product has been succesffuly deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
      order="desc",
      q
    } = req.query;
    // console(req)
    // chekcing is user is cutomer or admin to settle filter
// console.log(category,"id or accessory string check")

let categoryId;
if (category) {
  console.log(category,"category")
  const categoryDoc = await Category.findOne({ name: category.toLowerCase() });
    console.log(categoryDoc,"ID")
  
  if (categoryDoc) {

    console.log(categoryDoc._id,"ID")
    categoryId = categoryDoc._id;
  }
}
    // todo: settle initial filer for status after the auth
    // console.log(req.user,)
    const filter = req.user?.role === "admin" ? {} : { status: "published" };
console.log(filter,"filter")
    // trial basis with present all data
    // const filter={}

    if (gender) filter.gender = { $in: [gender.toLowerCase(), "unisex"] };

    // console.log(categoryId,"ID")
    if (categoryId) filter.category = categoryId;
    if (isNewArrival === 'true') filter.isNewArrival = true;

    if (isSale === 'true') filter.isSale = true;
    if (tags)
      filter.tags = {
        $in: tags.split(",").map((tag) => tag.trim().toLowerCase()),
      };
    if (q) filter.$text = { $search: q };

    // !whitelisting available sorts
    const allowedSorts = ["pricing", "rating", "createdAt"];

    const sortObj = q
      ? { score: { $meta: "textscore" } }
      : {
          [allowedSorts.includes(sort) ? sort : "createdAt"]:
            order === "asc" ? 1 : -1,
        };
console.log(sortObj)
    const products = await Products.find(filter).sort(sortObj).populate('category');

    if (!products) {
      return res
        .status(404)
        .json("the product u r looking for is not here try daraz");
    }

    res.status(200).json({ count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
      const query = req.user?.role === "admin" ? { slug: req.params.slug} : {  slug: req.params.slug,
        status: "published" };

    const product = await Products.findOne(query ).populate('category');

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).populate('category').lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // send  the id only so what no issue of object or string in front end later

      if (product.category?._id) {
      product.category = product.category._id;
    }

        
    res.status(200).json({ data: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  
}
}
