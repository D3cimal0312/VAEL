import { useState } from "react";
import {
  Search,
  User,
  ShoppingCart,
  SlidersVertical,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "@/context/AuthContext";
import Searchquery from "./Searchquery";

const Navbar = () => {
  const navoptions = ["NEW IN", "WOMEN", "MEN", "ACCESSORIES", "SALE", "ABOUT"];
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const getPath = (item) => {
    const slug = item.toLowerCase().replace(/\s+/g, "");
    return slug === "about" ? "/about" : `/category/${slug}`;
  };

  return (
    <div className="border-b border-hair ">
      {/* Main bar */}
      <div className="flex justify-between px-6 md:px-12 h-20 md:h-25 items-center">
        <NavLink to="/">
          <Logo />
        </NavLink>

        {/* Desktop nav links */}
        <div className="hidden lg:flex gap-12 items-center font-fair">
          {navoptions.map((item, index) => (
            <NavLink to={getPath(item)} key={index}>
              {({ isActive }) => (
                <div className="linked tracking-widest group cursor-pointer">
                  <p
                    className={`-mb-1 text-2xl transition-colors duration-200 ${isActive ? "text-ink" : "text-slate-500 hover:text-ink"}`}
                  >
                    {item}
                  </p>
                  <div
                    className={`h-0.5 bg-lux transition-all duration-300 ease-in-out ${isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"}`}
                  />
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Icons */}

        <div className="flex gap-5 md:gap-8 items-center  ">
          <Searchquery />

          <NavLink to="/profile">
            <button className="linked hover:text-lux transition-colors duration-200">
              <User size={22} />
            </button>
          </NavLink>

          <NavLink to="/cart">
            <div className="">
              <button className="linked hover:text-lux transition-colors duration-200">
                <ShoppingCart size={22} />
              </button>
            </div>
          </NavLink>

          {user?.role === "admin" && (
            <NavLink to="/admin" className="hidden md:block">
              <button className="linked hover:text-lux transition-colors duration-200">
                <SlidersVertical size={22} />
              </button>
            </NavLink>
          )}

          {/* Burger — mobile only */}
          <button
            className="lg:hidden linked hover:text-lux transition-colors duration-200"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
      <div className="lg:hidden fixed top-20 left-0 right-0 bg-cream z-[9999] border-b border-hair px-6 py-4 flex flex-col gap-1 shadow-lg">
         

          {navoptions.map((item, index) => (

            <NavLink
              to={getPath(item)}
              key={index}
              onClick={() => setMenuOpen(false)}
            >
              {({ isActive }) => (
                <p
                  className={`font-fair tracking-widest text-xl py-2 border-b border-hair/50 transition-colors duration-200 ${isActive ? "text-ink" : "text-slate-500"}`}
                >
                  {item}
                </p>
              )}
            </NavLink>
          ))}

          {user?.role === "admin" && (
            <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
              <p className="font-fair tracking-widest text-xl py-2 text-slate-500">
                ADMIN
              </p>
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
