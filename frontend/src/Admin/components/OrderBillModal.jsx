import { Modal } from "@mantine/core";
import { toPng } from "html-to-image";
import { useRef } from "react";
import Logo from "@/common/Logo";
import StatusBadge from "../common/StatusBadge";

const OrderBillModal = ({ opened, close, order }) => {
  const billRef = useRef();

  if (!opened || !order) return null;

  const downloadBill = async () => {
    try {
      const dataUrl = await toPng(billRef.current, {
        filter: (node) => !node.classList?.contains("exclude-download"),
        cacheBust: true,
        pixelRatio: 3,
      });
      const link = document.createElement("a");
      link.download = `${order.orderNumber}_${order.userId?.firstName}_${order.userId?.lastName}_bill.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      size="65%"
      opened={opened}
      onClose={close}
      centered
      title="Order Info"
      styles={{ content: { backgroundColor: "#f5f0e8" } }}
    >
      <div
        ref={billRef}
        className="mb-6 border border-hair rounded-xl bg-cream p-5 relative"
      >
        {/* header */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Logo />
            <p className="text-xs text-hair font-mono mb-1">
              {order.orderNumber}
            </p>
          </div>
          <button
            onClick={downloadBill}
            className="exclude-download mt-4 px-4 py-2 bg-black text-white rounded-lg"
          >
            Download Bill
          </button>
        </div>

        <p className="font-semibold text-ink text-lg mb-2">
          {order.userId?.firstName} {order.userId?.lastName}
          <span className="text-sm font-normal text-hair ml-2">
            {order.userId?.email}
          </span>
        </p>

        <div className="flex gap-2 mb-5 flex-wrap items-center exclude-download">
          <StatusBadge value={order.status} />
          <StatusBadge value={order.paymentStatus} />
          <span className="font-semibold text-hair">
            Ordered Date : {order.createdAt?.split("T")[0]}
          </span>
        </div>

        {/* Products Table */}
        <p className="uppercase text-xs tracking-widest font-semibold text-ink mb-2">
          Products
        </p>
        <div className="overflow-x-auto mb-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-lux text-white">
                {[
                  "#",
                  "Product",
                  "Size",
                  "Unit Price",
                  "Qty",
                  "Line Total",
                ].map((h) => (
                  <th
                    key={h}
                    className="border border-hair px-3 py-1.5 text-left font-semibold text-xs"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-hair hover:bg-cream-light"
                >
                  <td className="border border-hair px-3 py-2 text-hair text-xs">
                    {i + 1}
                  </td>
                  <td className="border border-hair px-3 py-2 text-ink font-medium">
                    {item.name}
                  </td>
                  <td className="border border-hair px-3 py-2 text-hair text-xs">
                    {item.size || "—"}
                  </td>
                  <td className="border border-hair px-3 py-2 text-right text-ink">
                    {item.price}
                  </td>
                  <td className="border border-hair px-3 py-2 text-right text-ink">
                    {item.quantity}
                  </td>
                  <td className="border border-hair px-3 py-2 text-right font-semibold text-ink">
                    {item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Pricing */}
          <div>
            <p className="uppercase text-xs tracking-widest font-semibold text-ink mb-2">
              Pricing Summary
            </p>
            <div className="space-y-1">
              {[
                ["Subtotal", order.pricing?.subtotal],
                ["Shipping", order.pricing?.shippingCost],
                ["VAT", order.pricing?.tax],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between text-lux font-semibold"
                >
                  <span>{label}</span>
                  <span className="text-ink font-normal">$ {val}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lux border-t border-hair pt-1.5 mt-1.5">
                <span>Total</span>
                <span className="text-2xl">$ {order.pricing?.total}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="uppercase text-xs tracking-widest font-semibold text-ink mb-2">
              Shipping Address
            </p>
            {[
              ["Province", order.shippingAddress?.province],
              ["District", order.shippingAddress?.district],
              ["Address", order.shippingAddress?.localAddress],
              ["Contact", order.shippingAddress?.phone],
            ].map(([label, val]) => (
              <div
                key={label}
                className="flex justify-between text-lux font-semibold"
              >
                <span>{label}</span>
                <span className="text-ink font-normal">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderBillModal;
