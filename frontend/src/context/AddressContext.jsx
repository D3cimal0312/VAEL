import { createContext, useContext, useState, useEffect } from "react";
import { userService } from "@/services/userService";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
const AddressContext = createContext(null);

export const AddressProvider = ({ children }) => {
  const { user } = useAuth();
  const [homeAddress, setHomeAddress] = useState({});
  const [workAddress, setWorkAddress] = useState({});
  const [selectedId, setSelectedId] = useState("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("user in AddressContext:", user);
  }, [user]);
  useEffect(() => {
    if (!user?.id) {
      setHomeAddress({});
      setWorkAddress({});
      setLoading(false);
      return;
    }
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const data = await userService.getMyAddress();
        setHomeAddress(data?.home || {});
        setWorkAddress(data?.work || {});
        setLoading(false);

      } catch (e) {
        toast.error(e.response?.data?.message || "Failed to fetch addresses");
        setLoading(false)
      } 
    };

    fetchAddresses();
  }, [user?.id]);

  const saveAddress = async (type, newValues) => {
    try {
      await userService.updateAddress(type, newValues);
      if (type === "home") setHomeAddress(newValues);
      if (type === "work") setWorkAddress(newValues);
      toast.success("Address saved successfully");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to save address");
    }
  };

  const getAddressSnapshot = () => {
    if (selectedId === "home") return { ...homeAddress };
    if (selectedId === "work") return { ...workAddress };
    return { ...homeAddress };
  };

  const hasHome =
    homeAddress && Object.keys(homeAddress).length > 0 && homeAddress.district;
  const hasWork =
    workAddress && Object.keys(workAddress).length > 0 && workAddress.district;

  return (
    <AddressContext.Provider
      value={{
        homeAddress,
        workAddress,
        selectedId,
        setSelectedId,
        saveAddress,
        getAddressSnapshot,
        loading,
        hasHome,
        hasWork,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context)
    throw new Error("useAddress must be used within <AddressProvider>");
  return context;
};
