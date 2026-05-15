import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { productService } from "../services/productService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Searchquery = () => {
  const [searchbar, setSearchbar] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!searchbar) {
          setProducts(null);
          return;
        }

        if (!search || search.trim().length <= 2) {
          setProducts(null);
          return;
        }

        setLoading(true);

        const data = await productService.getAll({ q: search, limit: 8 });
        setProducts(data);
      } catch (err) {
        toast.error(err.message);
        setProducts(null);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [search, searchbar]);

  return (
    <div className="relative">
      <div className="items-center flex gap-2  left-0 top-0">
        {searchbar && (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="linked border-2 border-lux rounded-full px-4 py-2 w-64 sm:w-72 md:w-80 placeholder:font-fair placeholder:text-lux font-fair focus:border-lux"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              autoFocus
            />
          </div>
        )}

        <button
          className="linked hover:text-lux z-50 transition-colors duration-200"
          onClick={() => {
            setSearchbar(!searchbar);
            if (searchbar) {
              setSearch("");
              setProducts(null);
            }
          }}
        >
          {!searchbar ? (
            <Search size={22} className="linked cursor-pointer" />
          ) : (
            <X size={22} className="linked cursor-pointer" />
          )}
        </button>
      </div>

      {/* search results dropdown  only show when conditions are met */}
      {searchbar && search.trim().length > 2 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-lux rounded-lg shadow-xl z-40 h-fit">
          {/* Loading State */}
          {loading && (
            <div className="p-4 text-center text-lux font-fair text-sm">
              Searching...
            </div>
          )}

          {/* Results */}
          {!loading && products && products.count > 0 ? (
            <div>
              {products.data.map((p) => (
                <Link
                  key={p._id}
                  to={`/products/${p.slug}`}
                  className="flex items-center gap-3 pr-3 border-b border-lux/10 hover:bg-lux/5 transition-colors"
                  onClick={() => {
                    setSearch("");
                    setSearchbar(false);
                  }}
                >
                  <img
                    src={p.images[0]}
                    alt={p.slug}
                    className="w-18 h-20 object-cover rounded bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-fair font-semibold text-lg text-lux truncate">
                      {p.name}
                    </p>
                    <span className="font-fair text-2xl text-lux">
                      $ {p.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : !loading ? (
            <div className="p-4 text-center text-lux/60 font-fair text-sm">
              No products found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Searchquery;