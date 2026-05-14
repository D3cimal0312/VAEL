import React from "react";
import Heading from "@/common/Heading";
import { useNavigate } from "react-router";
import Quantity from "@/common/Quantity.jsx";
import { useState, useEffect } from "react";
import Animatebtn from "@/common/Animatebtn.jsx";
import useCart from "@/hooks/carts/useCarts";

import { Trash2, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { orderService } from "@/services/orderService";
import toast from "react-hot-toast";

// ✅ Helper function - formats all prices consistently to 2 decimals
const formatPrice = (price) => {
  return parseFloat((Math.round(price * 100) / 100).toFixed(2));
};

const Cart = () => {
  const { user } = useAuth();
  const [ordering, setOrdering] = useState(false);

  const { cart, setCart, loading, count, removeFromCart, updateQuantity, clearCart } = useCart();
  console.log(cart);
  const [quantities, setQuantities] = useState({});

  // Initialize quantities from cart data once loaded
  useEffect(() => {
    if (cart?.length) {
      const initial = Object.fromEntries(
        cart.map((item) => [item._id, item.quantity]),
      );
      setQuantities(initial);
    }
  }, [cart]);

  const updateQuantityui = async (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
    updateQuantity(id, value);
  };

  //  Calculate prices using formatPrice helper
  const subPrice = formatPrice(
    cart?.reduce(
      (sum, item) =>
        sum +
        (item.productId?.price || 0) * (quantities[item._id] || item.quantity),
      0,
    ) || 0
  );

  const tax = formatPrice(0.13 * subPrice);
  const shipping = subPrice > 799 ? 0 : 9.99;
  const totalPrice = formatPrice(subPrice + tax + shipping);

  const orderSummary = [
    { label: "Subtotal", value: subPrice },
    { label: "Tax", value: tax },
    { label: "Shipping", value: shipping },
    { label: "Total", value: totalPrice },
  ];

  const navigate = useNavigate();

  if (loading)
    return <p className="p-14 font-fair text-2xl">Loading cart...</p>;

  const handleOrder = async () => {
    if (!cart || count == 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!user) {
      toast.error("Please login/register to buy products.");
      setTimeout(() => navigate("/auth/register"), 2000);
      return;
    }

    setOrdering(true);

{/* ── seeting data into proper format  ── */}
    const orderData = {
      items: cart.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: formatPrice(item.productId.price),
        size: item.size,
        colors: item.color,
        quantity: quantities[item._id] || item.quantity,
      })),
      pricing: {
        subtotal: subPrice,
        shippingCost: shipping,
        tax: tax,
        total: totalPrice,
      },
      shippingAddress: {
        houseNum: "12B",
        localAddress: "Lazimpat, Kathmandu",
        district: "Kathmandu",
        province: "Bagmati",
        phone: "9841000000"
      },
    };

    try {
      const order = await orderService.createOrder(orderData);
      await clearCart();
      toast.success("Order placed!");
      // navigate(`/orders/${order.orderNumber}`);
    } catch (e) {
      toast.error(e.message || "Failed to place order");
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div className="font-fair grid grid-cols-6">
      <div className="px-14 col-span-4 py-14 bg-white">
        <Heading mainheading="Your Cart" />

        <div className="flex justify-between items-center">
          <div className="text-xl flex justify-end items-center mb-8 text-lux font-bold underline underline-offset-8 decoration-dotted decoration-gray-300">
            <p>Items:<span className="font-sans ">{count}</span></p>
          </div>
          {cart && count > 0 && (
            <div className="flex justify-center items-center text-red-400 cursor-pointer" onClick={() => clearCart()}>
              <Trash2 className="" size={18} />
              <button>Empty Cart</button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {cart?.map((item) => {
            const product = item.productId;
            const qty = quantities[item._id] || item.quantity;
            const itemPrice = formatPrice(product?.price * qty);

            return (
              <div
                key={item._id}
                className="flex gap-8 border-b pb-4 border-gray-200"
              >
                <div>
                  <img
                    src={product?.images?.[0]}
                    alt={product?.name}
                    className="w-36 h-42"
                  />
                </div>

                <div className="w-full">
                  <div className="flex justify-between flex-1 ">
                    <div id="purchase_info" className="text-lg">
                      <p className="uppercase text-lux">{product?.name}</p>
                      <p className="text-2xl">{product?.name}</p>
                      <p className="text-hair">
                        <span>{item.color?.name}</span>
                        <span> . </span>
                        <span>Size {item.size}</span>
                      </p>
                      <Quantity
                        size={8}
                        quantity={qty}
                        setQuantity={(val) => updateQuantityui(item._id, val)}
                      />
                    </div>

                    <div className="h-fit">
                      <p className="text-4xl text-lux">
                        ${itemPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4 w-full ">
                    {/* View Detail */}
                    <button
                      onClick={() => navigate(`/products/${product?.slug}`)}
                      className="flex items-center gap-1.5 text-2xl text-gray-500 hover:text-black transition-colors duration-150"
                    >
                      <ExternalLink size={20} />
                      <span>View Detail</span>
                    </button>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="flex items-center gap-1.5 text-xl  text-red-400 hover:text-red-500 transition-colors duration-150"
                    >
                      <Trash2 size={18} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="border py-4 px-8 mt-4 uppercase hover:text-white hover:bg-black transition-all duration-100 ease-linear"
          onClick={() => navigate("/category/newin")}
        >
          Continue Shopping
        </button>
      </div>

      <div className="col-span-2 border-l border-hair p-8 py-14 bg-cream-light">
        <Heading macroheading={"Order Summary"} />

        <div className="pt-4 mb-14">
          {orderSummary.map((item) => (
            <div
              key={item.label}
              className={`flex justify-between text-2xl gap-2 ${
                item.label === "Total" ? "border-t border-black mt-4 pt-4" : ""
              }`}
            >
              <p className={item.label === "Total" ? "text-4xl" : ""}>
                {item.label}
              </p>
              <p className={item.label === "Total" ? "text-lux text-4xl" : ""}>
                ${item.value.toFixed(2)}
              </p>
            </div>
          ))}
          <div className="text-sm text-gray-500 pt-2">
            *Shipping cost is subject to change based on location and free on orders $799 and above
          </div>
        </div>

        <div onClick={handleOrder}>
          <Animatebtn str={"Proceed to Checkout"} />
        </div>
      </div>
    </div>
  );
};

export default Cart;