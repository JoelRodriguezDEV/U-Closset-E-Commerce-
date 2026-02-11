import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, ArrowRight, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useProducts } from "../../hooks/useProducts";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { products } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // --- LÓGICA DEL BUSCADOR ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  // Preview Results
  const previewResults = query.trim()
    ? products
        .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${query}`);
      setIsSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      <nav
        className={`
        w-full z-50 transition-all duration-300
        ${
          isHome
            ? "absolute top-0 left-0 bg-transparent text-white border-transparent"
            : "sticky top-0 bg-white dark:bg-black text-black dark:text-white border-b border-gray-200 dark:border-zinc-800"
        }
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 gap-4">
            {/* 1. LOGO */}
            <div className="flex-shrink-0 z-50">
              <Link to="/" className="text-2xl font-bold tracking-tighter">
                UC STORE
              </Link>
            </div>

            {/* 2. LINKS DESKTOP (Centro) */}
            <div className="hidden md:flex justify-center items-center space-x-8">
              {["Home", "Women", "Men", "Categories"].map((item) => (
                <Link
                  key={item}
                  to={
                    item === "Home"
                      ? "/"
                      : item === "Categories"
                        ? "/shop"
                        : `/shop?category=${item.toLowerCase()}`
                  }
                  className="text-sm font-medium hover:opacity-70 uppercase tracking-widest"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="md:hidden"></div>

            {/* 3. ICONOS (Derecha) */}
            <div className="flex items-center justify-end space-x-3 md:space-x-6 relative">
              {/* A. BUSCADOR */}
              <div
                className="relative flex items-center justify-end"
                ref={searchContainerRef}
              >
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className={`
                      absolute right-0 top-1/2 -translate-y-1/2
                      bg-transparent outline-none text-sm transition-all duration-300 ease-in-out z-10
                      border rounded-full
                      ${
                        isHome
                          ? "bg-black/30 backdrop-blur-md border-white/20 text-white placeholder-white/70"
                          : "bg-white/95 dark:bg-black/90 backdrop-blur-md border-gray-200 dark:border-zinc-700 text-black dark:text-white placeholder-gray-500"
                      }
                      ${
                        isSearchOpen
                          ? "w-[140px] md:w-[250px] opacity-100 pr-10 pl-4 py-2"
                          : "w-0 opacity-0 p-0 border-transparent"
                      }
                    `}
                  />

                  <button
                    type="submit"
                    onClick={(e) => {
                      if (!isSearchOpen) {
                        e.preventDefault();
                        setIsSearchOpen(true);
                      }
                    }}
                    className="relative z-20 hover:opacity-70 transition-opacity p-1"
                  >
                    <Search size={20} />
                  </button>
                </form>

                {/* Resultados */}
                {isSearchOpen && query.length > 0 && (
                  <div className="absolute top-full right-0 mt-4 w-[200px] md:w-[250px] bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2">
                    {previewResults.length > 0 ? (
                      <div>
                        {previewResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              navigate(`/shop/${product.id}`);
                              setIsSearchOpen(false);
                              setQuery("");
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer border-b border-gray-50 dark:border-zinc-800 last:border-0"
                          >
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-8 h-10 object-cover rounded-sm bg-gray-100 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0 overflow-hidden">
                              <h4 className="text-[11px] font-bold text-black dark:text-white truncate">
                                {product.title}
                              </h4>
                              <p className="text-[10px] text-gray-500">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 text-center text-[10px] text-gray-500">
                        No matches.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* B. USUARIO (OCULTO EN MÓVIL) */}
              {/* Agregamos 'hidden md:block' para que solo se vea en escritorio */}
              <Link
                to="/dashboard"
                className="hidden md:block hover:opacity-70 transition-opacity z-20"
              >
                <User size={20} />
              </Link>

              {/* C. MENÚ MÓVIL (SOLO MÓVIL) */}
              <button
                className="md:hidden z-20 hover:opacity-70 transition-opacity"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="relative w-[80%] max-w-xs h-full bg-white dark:bg-black text-black dark:text-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-bold tracking-tighter">MENU</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              {["Home", "Categories", "Women", "Men"].map((link) => (
                <Link
                  key={link}
                  to={
                    link === "Home"
                      ? "/"
                      : link === "Categories"
                        ? "/shop"
                        : `/shop?category=${link.toLowerCase()}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium flex justify-between items-center group"
                >
                  {link.toUpperCase()} <ArrowRight size={16} />
                </Link>
              ))}

              {/* ENLACE "MY ACCOUNT" EN EL MENÚ MÓVIL */}
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium flex justify-between items-center group pt-4 border-t border-gray-100 dark:border-zinc-800"
              >
                MY ACCOUNT <User size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
