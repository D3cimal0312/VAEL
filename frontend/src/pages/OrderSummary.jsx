import Animatebtn from "@/common/Animatebtn.jsx";
import Addressbox from "@/components/Addressbox";
import { useAddress } from "@/context/AddressContext";
import { Home, Briefcase } from "lucide-react";

const OrderSummary = ({ orderSummary, onCheckout, ordering }) => {
  const { homeAddress, workAddress, selectedId, setSelectedId, saveAddress, hasHome, hasWork } = useAddress();

  return (
    <div className="p-4  bg-cream-light">

      <div className="mb-2">
        <p className="text-lg uppercase text-gray-400 mb-3">
          Deliver to
        </p>

        <div className="flex gap-3 mb-4 w-full md:w-fit">
          <button
            onClick={() => setSelectedId("home")}
            className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 md:px-4 rounded-lg border text-xs md:text-sm font-fair transition-colors
              ${selectedId === "home"
                ? "bg-lux text-cream border-lux"
                : "border-lux/20 text-lux hover:bg-lux/5"
              }`}
          >
            <Home size={13} />
            Home
          </button>
          <button
            onClick={() => setSelectedId("work")}
            className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 md:px-4 rounded-lg border text-xs md:text-sm font-fair transition-colors
              ${selectedId === "work"
                ? "bg-lux text-cream border-lux"
                : "border-lux/20 text-lux hover:bg-lux/5"
              }`}
          >
            <Briefcase size={13} />
            Work
          </button>
        </div>

        <div className="w-full overflow-hidden">
          {selectedId === "home" && (
            <Addressbox address={homeAddress} addType="home" onSave={saveAddress} />
          )}
          {selectedId === "work" && (
            <Addressbox address={workAddress} addType="work" onSave={saveAddress} />
          )}
        </div>

        {selectedId === "home" && !hasHome && (
          <p className="text-xs text-red-400 font-fair mt-2">
            Please add a home address before checkout.
          </p>
        )}
        {selectedId === "work" && !hasWork && (
          <p className="text-xs text-red-400 font-fair mt-2">
            Please add a work address before checkout.
          </p>
        )}
      </div>

      <p className="font-cormorant text-2xl md:text-3xl font-medium text-lux mt-6">Order Summary</p>

      <div className="pt-2 mb-8 md:mb-14">
        {orderSummary.map((item) => (
          <div
            key={item.label}
            className={`flex justify-between gap-2 ${
              item.label === "Total"
                ? "border-t border-black mt-4 pt-4 text-2xl md:text-4xl"
                : "text-lg md:text-2xl"
            }`}
          >
            <p>{item.label}</p>
            <p className={item.label === "Total" ? "text-lux" : ""}>
              ${item.value.toFixed(2)}
            </p>
          </div>
        ))}
        <p className="text-xs md:text-sm text-gray-500 pt-2">
          *Shipping cost is subject to change based on location and free on orders $799 and above
        </p>
      </div>

      <div
        onClick={!ordering ? onCheckout : undefined}
        className={ordering ? "opacity-50 cursor-not-allowed" : ""}
      >
        <Animatebtn str={ordering ? "Placing Order..." : "Proceed to Checkout"} />
      </div>

    </div>
  );
};

export default OrderSummary;