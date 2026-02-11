import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/shop/ProductCard";

const CATEGORIES = [
  { id: "all", label: "View All" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "jewelery", label: "Jewelry" },
  { id: "electronics", label: "Electronics" },
];

export default function Shop() {
  const { products, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Estado derivado de la URL
  const activeCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (id: string) => {
    if (id === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: id });
    }
    window.scrollTo(0, 0);
  };

  // LÓGICA DE FILTRADO CORREGIDA 🧠
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;

    return products.filter((product) => {
      const productCat = product.category.toLowerCase();
      const selectedCat = activeCategory.toLowerCase();

      // FIX: Evitar que "Women" aparezca en "Men"
      // Si estamos buscando 'men' y la categoría del producto incluye 'women', lo descartamos.
      if (selectedCat === "men" && productCat.includes("women")) {
        return false;
      }

      return productCat.includes(selectedCat);
    });
  }, [products, activeCategory]);

  return (
    <div className="pt-24 pb-20 min-h-screen max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mb-2">
            {activeCategory === "all" ? "Full Catalog" : activeCategory}
          </h1>
          <p className="text-gray-500 text-sm">
            {filteredProducts.length} items found
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 relative">
        {/* SIDEBAR FILTERS */}
        <aside className="hidden md:block w-64 flex-shrink-0 sticky top-32 h-fit">
          <div className="border-b border-gray-200 dark:border-zinc-800 pb-4 mb-6">
            <h3 className="font-bold text-sm flex items-center gap-2 uppercase tracking-widest">
              <Filter size={16} /> Filters
            </h3>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Category
            </p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`block w-full text-left py-2 px-3 rounded-md transition-all text-sm font-medium
                  ${
                    activeCategory === cat.id
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </aside>

        {/* MOBILE FILTERS */}
        <div className="md:hidden flex overflow-x-auto pb-4 gap-2 no-scrollbar -mx-4 px-4 sticky top-20 bg-white dark:bg-black z-30 py-2 border-b border-gray-100 dark:border-zinc-800">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors
                ${
                  activeCategory === cat.id
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                    : "bg-transparent border-gray-200 text-gray-600 dark:border-zinc-800 dark:text-gray-400"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-gray-100 dark:bg-zinc-800 rounded-sm"
                />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 6}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-xl text-gray-400">No products found.</p>
              <button
                onClick={() => handleCategoryChange("all")}
                className="mt-4 text-sm font-bold border-b border-black dark:border-white pb-1"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
