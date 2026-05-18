import { useAdminOrders } from "@/hooks/orders/useAdminOrders";
import { orderService } from "@/services/orderService";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import StatusBadge from "../common/StatusBadge";
import OrderFilter from "../components/OrderFilter";
import OrderBillModal from "../components/OrderBillModal";
import Heading from "@/common/Heading";

import Paginationui from "@/common/Paginationui";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];
const PAYMENT_OPTIONS = ["unpaid", "paid", "refunded"];
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const tableheadClass =
  "border border-hair px-4 py-2 text-left text-sm font-semibold";
const tableCellClass = "border border-hair px-4 py-3 text-sm";

const AdminOrders = () => {
  const [filters, setFilters] = useState({
    status: "",
    paymentStatus: "",
    q: "",
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const { orders, loading, count, totalPage, page, setPage } = useAdminOrders(
    filters,
    refreshKey,
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const HEADERS = [
    "Order #",
    "Customer",
    "Created Date",
    "Items",
    "Total",
    "Order Status",
    "Payment",
    "Actions",
  ];

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));
  const clearFilters = () =>
    setFilters({ status: "", paymentStatus: "", q: "" });
  const refetch = () => setRefreshKey((k) => k + 1);
const handleSave = async (id) => {
  setSavingId(id);
  try {
    await orderService.updateOrderStatus(id, editValues.status);
    await orderService.updatePaymentStatus(id, editValues.paymentStatus);
    toast.success("Order updated successfully");
    refetch();
  } catch (e) {
    toast.error(e.response?.data?.message || "Failed to update order");
  } finally {
    setSavingId(null);
    setEditingId(null);
  }
};

  return (
    <div className="bg-cream-light px-4 ">
      <Heading mainheading={"Orders"} subheading={"Manage your orders"} />

      {/* ── MODAL ── */}
      <OrderBillModal opened={opened} close={close} order={currentOrder} />

      {/* ── FILTERS ── */}
      <div className="bg-white px-6 py-3  rounded-xl">
        <OrderFilter
          filters={filters}
          updateFilter={updateFilter}
          clearFilters={clearFilters}
        />
      </div>
      {/* ── HEADER ── */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-ink">
          Orders
          <span className="text-sm font-normal text-hair ml-1">
            ({count} total)
          </span>
        </h2>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-lux text-white rounded-lg hover:bg-lux/90 transition-colors font-medium text-sm"
        >
          Refresh
        </button>
      </div>

      {/* ── TABLE ── */}
      <div className="overflow-x-auto max-h-[90vh] overflow-y-auto border border-hair rounded-lg">
        <table className="w-full border-collapse border border-hair">
          <thead className="bg-lux text-white sticky top-0">
            <tr>
              {HEADERS.map((h) => (
                <th key={h} className={tableheadClass}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {Array.isArray(orders) && orders.length > 0 ? (
            <tbody>
              {orders.map((order) => {
                const isEditing = editingId === order._id;
                const isSaving = savingId === order._id;
                return (
                  <tr
                    key={order._id}
                    className="border-b border-hair hover:bg-cream-light transition-colors cursor-pointer"
                    onClick={() => {
                      setCurrentOrder(order);
                      open();
                    }}
                  >
                    <td
                      className={`${tableCellClass} text-xs text-hair font-mono`}
                    >
                      {order.orderNumber}
                    </td>

                    <td className={tableCellClass}>
                      <p className="font-semibold text-ink">
                        {order.userId?.firstName} {order.userId?.lastName}
                      </p>
                      <p className="text-hair text-xs">{order.userId?.email}</p>
                    </td>

                    <td className={`${tableCellClass} text-xs text-hair`}>
                      {order.createdAt?.split("T")[0]}
                    </td>

                    <td className={`${tableCellClass} text-center text-ink`}>
                      {order.items?.length ?? 0}
                    </td>

                    <td className={`${tableCellClass} font-semibold text-ink`}>
                      ${order.pricing?.total}
                    </td>

                    {/* Order Status */}
                    <td className={tableCellClass}>
                      {isEditing ? (
                        <select
                          value={editValues.status}
                          onChange={(e) =>
                            setEditValues((p) => ({
                              ...p,
                              status: e.target.value,
                            }))
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="border border-hair rounded px-2 py-1 text-xs text-ink bg-white"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {capitalize(s)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <StatusBadge value={order.status} />
                      )}
                    </td>

                    {/* Payment Status */}
                    <td className={tableCellClass}>
                      {isEditing ? (
                        <select
                          value={editValues.paymentStatus}
                          onChange={(e) =>
                            setEditValues((p) => ({
                              ...p,
                              paymentStatus: e.target.value,
                            }))
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="border border-hair rounded px-2 py-1 text-xs text-ink bg-white"
                        >
                          {PAYMENT_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {capitalize(s)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <StatusBadge value={order.paymentStatus} />
                      )}
                    </td>

                    {/* Actions */}
                    <td className={tableCellClass}>
                      <div
                        className="flex gap-2 flex-wrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(order._id)}
                              disabled={isSaving}
                              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-xs disabled:opacity-60"
                            >
                              {isSaving ? "Saving…" : "Save"}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 font-medium text-xs"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEdit(order)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium text-xs"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan="8"
                  className="border border-hair px-4 py-6 text-center text-hair"
                >
                  {loading ? "Loading orders…" : "No orders found."}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {/* Pagination */}
      <Paginationui
        totalPage={totalPage}
        page={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminOrders;
