import Fav from "../models/Favourites.js";
import Products from "../models/Products.js";

export const toggleFav = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const product = await Products.exists({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "product not found or not published" });
    }

    const list = await Fav.findOne({ user: userId });
    const alreadyFaved = list?.items.some(
      (item) => item.product.toString() === productId
    );

    const updated = await Fav.findOneAndUpdate(
      { user: userId },
      alreadyFaved
        ? { $pull: { items: { product: productId } } }
        : { $push: { items: { product: productId, addedAt: new Date() } } },
      { new: true, upsert: true }
    ).populate("items.product", "name images price rating category slug stock");

    return res.status(200).json({
      action: alreadyFaved ? "removed" : "added",
      items: updated.items,
      count: updated.items.length,
    });
  } catch (err) {
    console.error("[toggleFav]", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserFavs = async (req, res) => {
  try {
    const userId = req.user._id;

    const list = await Fav.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name images price rating slug stock",

    });

    if (!list) {
      return res.json({ items: [], count: 0 });
    }

    return res.json({
      items: list.items,
      count: list.items.length,
    });
  } catch (err) {
    console.error("geting UserFavs", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const isFav = async (req, res) => {
  try {
    const exists = await Fav.exists({
      user: req.user._id,
      "items.product": req.params.productId,
    });
    return res.json({ isFav: !!exists });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const clearFavs = async (req, res) => {
  try {
    const userId = req.user._id;

    const list = await Fav.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } },
      { new: true }
    );

    if (!list) {
      return res.status(404).json({ message: "Unable to find the fav list" });
    }

    res.json({ message: "Successfully cleared fav list", items: [], count: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};