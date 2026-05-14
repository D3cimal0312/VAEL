import Cart from "../models/Cart.js";

// GET /api/cart
// fetch all cart items for logged in user, populate full product data
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate({
      path: "items.productId",
      select: "name images slug price",
    });

    // empty cart is not an error
    if (!cart) return res.status(200).json({ count: 0, data: [] });

    res.status(200).json({ count: cart.items.length, data: cart.items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/cart
// upsert — if productId+color+size combo exists bump quantity, otherwise create new doc
export const addToCart = async (req, res) => {
  const { productId, quantity = 1, color, size } = req.body;
  if (!productId)
    return res.status(400).json({ message: "productId is required" });
  if (!color?.name)
    return res.status(400).json({ message: "color is required" });

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    // if no cart yet — create one with this item
    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [{ productId, color, size, quantity }],
      });
      return res.status(200).json({ data: cart.items });
    }

    // if found, quantity increase
    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.color?.name === color.name &&
        item.size === size,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, color, size, quantity });
    }

    await cart.save();

    res.status(200).json({ data: cart.items });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// PATCH /api/cart/:id
// set quantity directly — :id is the cartItem _id not productId
export const updateQuantity = async (req, res) => {
  const { quantity } = req.body;

  if (!quantity)
    return res.status(400).json({ message: "quantity is required" });
  if (quantity <= 0)
    return res.status(400).json({ message: "quantity must be greater than 0" });

  try {
    // $ positional operator updates the matched item inside the array
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id, "items._id": req.params.id },
      { $set: { "items.$.quantity": quantity } },
      { new: true, runValidators: true },
    ).populate({
      path: "items.productId",
      select: "name images slug price",
    });

    if (!cart) return res.status(404).json({ message: "Cart item not found" });

    res.status(200).json({ data: cart.items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/cart/:id
// remove one item — :id is cartItem _id
export const removeFromCart = async (req, res) => {
  try {
    // scope to user — can't delete other user's items
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { items: { _id: req.params.id } } },
      { new: true },
    );

    if (!cart) return res.status(404).json({ message: "Cart item not found" });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/cart/clear
// wipe entire cart — called after order is placed
export const clearCart = async (req, res) => {
  try {
    // result.deletedCount tells you how many were removed
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { items: [] } },
      { new: true },
    );

    res.status(200).json({ message: "Cart cleared", deleted: cart ? 1 : 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// !todo handle merge cart logic properly 
// //!done
export const mergeCart = async (req, res) => {
  try {
    console.log(1);
    const { items } = req.body;
    console.log("merge", items, req.user.id);
    console.log(2);

    let cart = await Cart.findOne({ userId: req.user.id });

    // if no cart yet — create one
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    for (const item of items) {
      const { productId, quantity, color, size } = item;
      console.log(3);

      const existingItem = cart.items.find(
        (i) =>
          i.productId.toString() === productId._id &&
          i.color?.name === color.name &&
          i.size === size,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId: productId._id, color, size, quantity });
      }
    }

    await cart.save();

    res.status(200).json({ message: "Cart merged successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};
