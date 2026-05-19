import React, { useState } from "react";
import { Link } from "react-router";
import {
  ShoppingCart,
  ChevronDown,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  PackageX,
} from "lucide-react";

import { orderService } from "@/services/orderService";
import toast from "react-hot-toast";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getStatusColor = (status) => {
  const statusMap = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      icon: Clock,
    },
    processing: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: Package,
    },
    shipped: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: Package,
    },
    delivered: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      icon: CheckCircle,
    },
    cancelled: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      icon: AlertCircle,
    },
  };
  return statusMap[status] || statusMap.pending;
};

const getPaymentStatusColor = (status) => {
  return status === "paid"
    ? "text-green-600 font-semibold"
    : "text-amber-600 font-semibold";
};

const OrderHistory = ({ orders, count, loading }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  
  console.log(orders,"order from orderhistory");  const cancelOrder=async(id,status)=>{
    try {
      await orderService.cancelOrder(id,status)
      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  }

  if (loading) {
    return (
      <div className="bg-cream rounded-2xl p-8 min-h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-lux border-t-transparent rounded-full animate-spin" />
          <p className="text-lux font-fair text-lg opacity-60">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="bg-cream rounded-2xl p-4 sm:p-6">
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-3xl sm:text-5xl text-lux font-fair">
            Order History
          </h1>
          <span className="text-lux font-fair opacity-50 text-base sm:text-lg">
            {count} items
          </span>
        </div>
        <div className="min-h-64 flex flex-col items-center justify-center gap-3">
          <ShoppingCart color="#d4905a" fill="#d4905a" size={55} />
          <p className="text-lux font-fair text-2xl">No Orders Yet</p>
          <Link
            to="/category/newin"
            className="text-lux font-fair underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream rounded-2xl p-4 sm:p-6">
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-3xl sm:text-5xl text-lux font-fair">
          Order History
        </h1>
        <span className="text-lux font-fair opacity-50 text-base sm:text-lg">
          {count} orders
        </span>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const isExpanded = expandedOrder === order._id;
          const statusInfo = getStatusColor(order.status);
          const StatusIcon = statusInfo.icon;

          return (
            <div
              key={order._id}
              className="bg-cream-light  rounded-xl overflow-hidden border border-transparent hover:border-lux/20 transition-all duration-200"
            >
              {/* Order Header - Always Visible */}
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-white/40 transition-colors duration-200 text-left"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                  {/* Order Number */}
                  <div>
                    <p className="text-xs text-lux opacity-60 font-fair uppercase tracking-wide">
                      Order ID
                    </p>
                    <p className="text-lux font-fair font-semibold text-sm sm:text-base">
                      {order.orderNumber}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-xs text-lux opacity-60 font-fair uppercase tracking-wide">
                      Date
                    </p>
                    <p className="text-lux font-fair text-sm sm:text-base">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <p className="text-xs text-lux opacity-60 font-fair uppercase tracking-wide mb-1">
                      Status
                    </p>
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border ${statusInfo.bg} ${statusInfo.border}`}
                    >
                      <StatusIcon size={14} className={statusInfo.text} />
                      <span
                        className={`text-xs font-fair font-medium capitalize ${statusInfo.text}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-right">
                    <p className="text-xs text-lux opacity-60 font-fair uppercase tracking-wide">
                      Total
                    </p>
                    <p className="text-lux font-fair font-semibold text-sm sm:text-base">
                      ${order.pricing.total}
                    </p>
                  </div>
                </div>

                {/* Expand Button */}
                <ChevronDown
                  size={20}
                  className={`text-lux opacity-60 ml-4 transition-transform duration-300  ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Order Details - Expandable */}
              {isExpanded && (
                <div className="border-t border-lux/10 bg-white/30 p-4 sm:p-5 space-y-5 animate-in fade-in duration-200">
                  {/* Payment Status */}
                  <div className="flex items-center justify-between pb-4 border-b border-lux/10">
                    <span className="text-lux font-fair text-sm opacity-75">
                      Payment Status
                    </span>
                    <span
                      className={`text-sm font-fair ${getPaymentStatusColor(order.paymentStatus)}`}
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() +
                        order.paymentStatus.slice(1)}
                    </span>
                  </div>

                  {/* Items Section */}
                  <div>
                    <h3 className="text-lux font-fair font-semibold mb-3 text-sm">
                      Items ({order.items.length})
                    </h3>
                    <div className="space-y-2 h-fit overflow-y-auto">
                      {order.items.map((item) => (
                        <div
                          key={item._id}
                          className="bg-white/50 rounded-lg p-3 flex items-center justify-between group hover:bg-white/70 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="text-lux font-fair text-xl font-semibold">
                              <span>{item.name}</span>
                              <Link to={`/products/${item.productId.slug}`}>
                                <span className=" ml-4 text-lux-light font-fair text-lg font-semibold underline underline-offset-4  hover:text-green-300 transition-all duration-300 cursor-pointer">
                                  View Details
                                </span>
                              </Link>
                            </p>
                            <div className="flex flex-wrap gap-6 mt-1 text-xs text-lux opacity-70">
                              <span>Size: {item.size}</span>
                              <span className="flex items-center gap-1">
                                Color:
                                <span
                                  className="w-6 h-6 rounded-full border "
                                  style={{ backgroundColor: item.colors.hex }}
                                  title={item.colors.name}
                                />
                                {item.colors.name}
                              </span>
                              <span>Quantity: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right  ml-4">
                            <p className="text-lux font-fair font-semibold text-xl">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-lux opacity-60 font-fair text-lg">
                              ${item.price} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-white/50 rounded-lg p-3 space-y-2 border border-lux/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-lux opacity-75 font-fair">
                        Subtotal
                      </span>
                      <span className="text-lux font-fair font-medium">
                        ${order.pricing.subtotal}
                      </span>
                    </div>
                    {order.pricing.shippingCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-lux opacity-75 font-fair">
                          Shipping
                        </span>
                        <span className="text-lux font-fair font-medium">
                          ${order.pricing.shippingCost}
                        </span>
                      </div>
                    )}
                    {order.pricing.discountAmount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-lux opacity-75 font-fair">
                          Discount
                        </span>
                        <span className="text-green-600 font-fair font-medium">
                          -${order.pricing.discountAmount}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-lux/10 pt-2 flex justify-between">
                      <span className="text-lux font-fair font-semibold text-2xl">
                        Total
                      </span>
                      <span className="text-lux font-fair font-bold text-2xl">
                        ${order.pricing.total}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="flex justify-between flex-wrap">
                  <div>
                    <h3 className="text-lux font-fair font-semibold mb-2 text-sm">
                      Shipping Address
                    </h3>
                    <div className="bg-white/50 rounded-lg p-3 text-sm text-lux opacity-75 font-fair space-y-0.5">
                      <p>
                        {order.shippingAddress.houseNum},{" "}
                        {order.shippingAddress.localAddress}
                      </p>
                      <p>
                        {order.shippingAddress.district},{" "}
                        {order.shippingAddress.province}
                      </p>

                      <p className="font-semibold text-lux">
                        Ph: {order.shippingAddress.phone}
                      </p>
                    </div>
                  </div>
                  {
                    (order.status==="pending" || order.status==="confirmed") && 
                  
                    <div className="self-end">
                      <button
                      onClick={()=>cancelOrder(order._id,order.status)}
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border border-red-200 bg-transparent text-red-600 text-[13.5px] cursor-pointer transition-colors duration-100 hover:bg-red-50 hover:border-red-200 font-[inherit]"
        >
          <PackageX size={24} className="text-red-600" />
                        Cancel order
                      </button>
                    </div>
        }
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
