import { Link } from "react-router-dom";
import { useUser } from "@/hooks/users/useUser";
import { useAuth } from "@/context/AuthContext";
import { useAddress } from "@/context/AddressContext";
import Favourites from "@/components/Favourites";
import useFavourite from "@/hooks/favourites/useFavourites";
import { useOrders } from "@/hooks/orders/useOrders";
import OrderHistory from "@/components/OrderHistory";
import Addressbox from "@/components/Addressbox";
import {
  LogOut,
  Package,
  Heart,
  Wallet,
  Mail,
  CalendarDays,
} from "lucide-react";
import { ProfileSkeleton } from "@/components/ui/Skeletons";

const Profile = () => {
  const { LogoutUser } = useAuth();
  const { count, items, loadings } = useFavourite();
  const {
    order,
    count: orderCount,
    loading: orderLoadings,
    spent,
  } = useOrders();
  const { userDetails, loading } = useUser();

  const {
    homeAddress,
    workAddress,
    saveAddress,
    loading: addressLoading,
  } = useAddress();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading || orderLoadings || loadings) return <ProfileSkeleton />;

  const stats = [
    { icon: Package, label: "Orders", value: orderCount },
    { icon: Heart, label: "Favourites", value: count },
    { icon: Wallet, label: "Spent", value: `$. ${spent}` },
  ];

  return (
    <div className="min-h-screen bg-cream-light font-fair px-6 md:px-12 py-10 flex flex-col gap-8">
      {/* Hero banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[url('/main.png')] bg-cover bg-center h-48 md:h-56">
        <div className="absolute inset-0 bg-black/60" />
        <button
          onClick={LogoutUser}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 text-white hover:text-red-500 hover:scale-110 transition-transform duration-200"
        >
          <LogOut size={24} />
          <span className="text-2xl">Logout</span>
        </button>
        <div className="absolute bottom-5 left-6 z-10">
          <p className="text-white text-2xl  uppercase">{greeting()}</p>
          <h1 className="font-cormorant text-white text-4xl md:text-5xl ">
            {userDetails.firstName}{" "}
            <span className="text-lux-light">{userDetails.lastName}</span>
          </h1>
        </div>
      </div>

      <div className="flex justify-between gap-4 flex-wrap">
        {/* Member info */}
        <div className="md:col-span-1 bg-card rounded-2xl p-5 flex flex-col gap-3">
          <p className="text-lg uppercase  text-gray-400">Account</p>
          <div className="flex items-center gap-2 text-sm text-ink">
            <Mail size={14} className="text-lux shrink-0" />
            <span className="truncate">{userDetails.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-ink">
            <CalendarDays size={14} className="text-lux shrink-0" />
            <span>
              Member since{" "}
              <span className="text-lux font-medium">
                {userDetails.createdAt?.slice(0, 10)}
              </span>
            </span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="flex flex-col md:flex-row">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-card rounded-2xl text-center p-5 flex items-center md:flex-col gap-2"
          >
            <div className="flex items-center  gap-2 md:gap-8">
              <p className="text-lg uppercase  text-gray-400">{label}</p>
              <Icon size={24} className="text-lux opacity-60" />
            </div>
            <p className="font-fair text-4xl font-medium text-lux text-left md:text-center leading-none">
              {value}
            </p>
          </div>
        ))}
</div>
        <div>
          <p className="text-lg uppercase  text-gray-400 mb-3">
            Saved addresses
          </p>
          {addressLoading ? (
            <div className="flex gap-5">
              <div className="w-48 h-24 rounded-xl bg-offwhite animate-pulse" />
              <div className="w-48 h-24 rounded-xl bg-offwhite animate-pulse" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-5">
              <Addressbox
                address={homeAddress}
                addType="home"
                onSave={saveAddress}
              />
              <Addressbox
                address={workAddress}
                addType="work"
                onSave={saveAddress}
              />
            </div>
          )}
        </div>
      </div>

      {/* Activity */}
      <div className="flex flex-col gap-6">
        <div data-aos="fade-up" data-aos-delay="100">
          <Favourites items={items} loading={loadings} count={count} />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <OrderHistory
            orders={order}
            loading={orderLoadings}
            count={orderCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
