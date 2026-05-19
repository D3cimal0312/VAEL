import React from "react";
import Logo from "@/common/Logo";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  LogOut,
  Mail,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mainlink = "/admin";

const navSections = [
  {
    label: "Main",
    items: [
      { to: mainlink, label: "Overview", icon: LayoutDashboard, end: true },
      { to: `${mainlink}/products`, label: "Products", icon: Package },
      { to: `${mainlink}/orders`, label: "Orders", icon: ShoppingBag },
      { to: `${mainlink}/customers`, label: "Customers", icon: Users },
    ],
  },
  {
    label: "Store",
    items: [
      { to: `${mainlink}/categories`, label: "Categories", icon: Tag },
      { to: `${mainlink}/inquiries`, label: "Inquiry", icon: Mail },
    ],
  },
];

const AdminNav = () => {
  const { LogoutUser } = useAuth();

  return (
    <div className="h-full flex flex-col bg-cream-light border-r border-offwhite">
      {/* Brand */}
      <NavLink to={mainlink} className="no-underline">
        <div className="flex items-center gap-3 px-5 py-[22px] border-b border-offwhite">
          <div className="w-[34px] h-[34px] rounded-lg bg-lux flex items-center justify-center shrink-0">
            <LayoutDashboard
              size={17}
              className="text-cream"
              strokeWidth={1.8}
            />
          </div>
          <div>
            <div className=" font-medium text-hair-dark leading-tight m-0">
              <Logo></Logo>
            </div>
            <p className="text-lg text-hair uppercase tracking-widest m-0">
              Admin Panel
            </p>
          </div>
        </div>
      </NavLink>

      {/* Nav body */}
      <div className="flex-1 overflow-y-auto py-3">
        {navSections.map((section) => (
          <div key={section.label} className="mt-4">
            <p className="text-[10px] font-medium uppercase  text-hair opacity-70 px-5 mb-1">
              {section.label}
            </p>

            {section.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className="no-underline">
                {({ isActive }) => (
                  <div
                    className={`relative flex items-center gap-[10px] px-5 py-2 cursor-pointer transition-colors duration-100
                      ${isActive ? "bg-cream" : "hover:bg-cream"}`}
                  >
                    {/* Active bar */}
                    {isActive && (
                      <span className="absolute left-0 top-[5px] bottom-[5px] w-[3px] rounded-r-sm bg-lux" />
                    )}

                    <Icon
                      size={16}
                      strokeWidth={isActive ? 2 : 1.6}
                      className={isActive ? "text-lux" : "text-hair"}
                    />

                    <span
                      className={`text-[13.5px] leading-none
                        ${isActive ? "font-medium text-hair-dark" : "font-normal text-hair"}`}
                    >
                      {label}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-5 border-t border-offwhite">
        <button
          onClick={LogoutUser}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border border-[#e8ddd4] bg-transparent text-red-600 text-[13.5px] cursor-pointer transition-colors duration-100 hover:bg-red-50 hover:border-red-200 font-[inherit]"
        >
          <LogOut size={15} strokeWidth={1.8} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
