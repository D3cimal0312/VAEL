import { Search, User, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const navoptions = ["NEW IN", "WOMEN", "MEN", "ACCESSORIES", "SALE", "ABOUT"];

  const getPath = (item) => {
    const slug = item.toLowerCase().replace(/\s+/g, "");
    return slug === "about" ? "/about" : `/category/${slug}`;
  };

  return (
    <div className="flex justify-between px-12 h-25 items-center border-b border-hair">
      <NavLink to="/">
        {" "}
        <Logo />
      </NavLink>

      <div className="flex gap-12 items-center font-fair">
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

      <div className="flex gap-8 items-center">
        <button className="linked hover:text-lux transition-colors duration-200">
          <Search size={24} />
        </button>

        <NavLink to="/profile">
        <button className="linked hover:text-lux transition-colors duration-200">
          <User size={24} />
        </button>
</NavLink>

        <NavLink to="/cart">
          <div className="relative">
            <ShoppingCart size={24} className="linked" />
            <div className="absolute -top-5 -right-2 bg-lux rounded-full px-2 text-sm text-white">
              3
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
