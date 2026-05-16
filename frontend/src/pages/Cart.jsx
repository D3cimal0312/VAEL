import React, { useState, useEffect } from "react";
import Heading from "@/common/Heading";
import { useNavigate } from "react-router";
import Quantity from "@/common/Quantity.jsx";
import useCart from "@/hooks/carts/useCarts";
import OrderSummary from "@/pages/OrderSummary";
import { Trash2, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAddress } from "@/context/AddressContext";
import { orderService } from "@/services/orderService";
import toast from "react-hot-toast";

import { CartSkeleton } from "@/components/ui/Skeletons";

const formatPrice = (price) => {
  return parseFloat((Math.round(price * 100) / 100).toFixed(2));
};

const Cart = () => {
  const { user } = useAuth();
  const { getAddressSnapshot, hasHome, hasWork, selectedId } = useAddress();
  const [ordering, setOrdering] = useState(false);
  const { cart, loading, count, removeFromCart, updateQuantity, clearCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (cart?.length) {
      const initial = Object.fromEntries(
        cart.map((item) => [item._id, item.quantity])
      );
      setQuantities(initial);
    }
  }, [cart]);

  const updateQuantityui = async (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
    updateQuantity(id, value);
  };

  const subPrice = formatPrice(
    cart?.reduce(
      (sum, item) =>
        sum + (item.productId?.price || 0) * (quantities[item._id] || item.quantity),
      0
    ) || 0
  );

  const tax = formatPrice(0.13 * subPrice);
  const shipping = subPrice > 799 ? 0 : 9.99;
  const totalPrice = formatPrice(subPrice + tax + shipping);

  const orderSummary = [
    { label: "Subtotal", value: subPrice },
    { label: "Tax",      value: tax },
    { label: "Shipping", value: shipping },
    { label: "Total",    value: totalPrice },
  ];

  const handleOrder = async () => {
    if (!cart || count === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!user) {
      toast.error("Please login/register to buy products.");
      setTimeout(() => navigate("/auth/register"), 2000);
      return;
    }
    const selectedHasAddress = selectedId === "home" ? hasHome : hasWork;
    if (!selectedHasAddress) {
      toast.error(`Please add a ${selectedId} address before checkout.`);
      return;
    }

    setOrdering(true);

    const orderData = {
      items: cart.map((item) => ({
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
      shippingAddress: getAddressSnapshot(),
    };

    try {
      await orderService.createOrder(orderData);
      await clearCart();
      toast.success("Order placed!");
    } catch (e) {
      toast.error(e.message || "Failed to place order");
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return <CartSkeleton />;

  return (
    <div className="font-fair flex flex-col md:flex-row min-h-screen">

   
      <div className="flex-1 px-6 md:px-14 py-14 bg-white">
        <Heading mainheading="Your Cart" />

        <div className="flex justify-between items-center">
          <div className="text-xl flex justify-end items-center mb-8 text-lux font-bold underline underline-offset-8 decoration-dotted decoration-gray-300">
            <p>Items:<span className="font-sans">{count}</span></p>
          </div>
          {cart && count > 0 && (
            <div
              className="flex justify-center items-center text-red-400 cursor-pointer"
              onClick={() => clearCart()}
            >
              <Trash2 size={18} />
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
              <div key={item._id} className="flex gap-4 md:gap-8 border-b pb-4 border-gray-200">
                <div>
                  <img
                    src={product?.images?.[0]}
                    alt={product?.name}
                    className="w-24 md:w-36 h-42"
                  />
                </div>

                <div className="w-full">
                  <div className="flex justify-between flex-1">
                    <div id="purchase_info" className="text-lg">
                      <p className="uppercase text-lux">{product?.name}</p>
                      <p className="text-xl md:text-2xl">{product?.name}</p>
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
                      <p className="text-2xl md:text-4xl text-lux">${itemPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4 w-full">
                    <button
                      onClick={() => navigate(`/products/${product?.slug}`)}
                      className="flex items-center gap-1.5 text-lg md:text-2xl text-gray-500 hover:text-black transition-colors duration-150"
                    >
                      <ExternalLink size={20} />
                      <span>View Detail</span>
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="flex items-center gap-1.5 text-base md:text-xl text-red-400 hover:text-red-500 transition-colors duration-150"
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


      <div className="w-full md:w-96  md:sticky md:top-0 md:h-screen md:overflow-y-auto border-t md:border-t-0 md:border-l border-hair bg-cream-light">
        <OrderSummary
          orderSummary={orderSummary}
          onCheckout={handleOrder}
          ordering={ordering}
        />
      </div>

    </div>
  );
};

export default Cart;