import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/shop/ProductCard";
import React from "react";

// --- COMPONENTE AUXILIAR PARA EL EFECTO DE ESCRITURA ---
interface SplitTextProps {
  text: string;
  className?: string;
  startIndex?: number;
}

const SplitText = ({
  text,
  className = "",
  startIndex = 0,
}: SplitTextProps) => {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, index) => {
        const globalIndex = startIndex + index;
        return (
          <span
            key={index}
            className="char-reveal"
            style={{ "--char-index": globalIndex } as React.CSSProperties}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
};

export default function Home() {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section
        className="relative h-screen min-h-[600px] w-full bg-scroll md:bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1627061560899-1c36a3d1657e?q=80&w=1577&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="animate-enter text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4 text-gray-200">
            Spring Summer 2026
          </p>

          <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-8 leading-tight">
            <SplitText text="Elevated" />
            <br />
            <SplitText
              text="Essentials"
              className="italic font-serif"
              startIndex={7}
            />
          </h1>

          <div className="animate-enter delay-500">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border-b border-white pb-1 text-lg hover:opacity-70 transition-opacity"
            >
              Discover Collection <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* --- NUEVO: SCROLL DOWN INDICATOR --- */}
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="absolute bottom-10 left-0 right-0 mx-auto w-fit text-white flex flex-col items-center gap-2 animate-bounce hover:opacity-70 transition-opacity cursor-pointer z-20"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-widest font-medium">
            Explore
          </span>
          {/* Icono de flecha simple y elegante */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="w-6 h-6"
          >
            <path d="M7 13L12 18L17 13M12 6L12 17" />
          </svg>
        </button>
      </section>

      {/* 2. CATEGORIES */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Link
            to="/shop?category=women"
            className="group relative overflow-hidden block hover-breathe"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/1d/07/6a/1d076a42e81ae31d9c873ccce933983c.jpg"
                alt="Women"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-medium">Women</h3>
                <p className="text-sm text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  Ready-to-wear essentials.
                </p>
              </div>
              <span className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          <div className="flex flex-col gap-8 md:mt-20">
            <Link to="/shop?category=men" className="group relative block">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="https://i.pinimg.com/1200x/fc/92/97/fc92976d40d2d57a175706a2fd52ad67.jpg"
                  alt="Men"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <h3 className="text-xl font-medium">Men</h3>
                <span className="text-xs uppercase tracking-widest">
                  Explore
                </span>
              </div>
            </Link>
            <Link to="/shop?category=jewelery" className="group relative block">
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="https://i.pinimg.com/736x/3a/2e/ee/3a2eee287efdb5b512fdf087f0c91253.jpg"
                  alt="Accessories"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <h3 className="text-xl font-medium">Accessories +</h3>
                <span className="text-xs uppercase tracking-widest">
                  Explore
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CURATED SELECTION */}
      <section className="bg-white dark:bg-black py-20 px-4 w-full border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <h2 className="text-2xl font-normal tracking-tight">
              Essentials{" "}
              <span className="font-serif italic text-gray-400"></span>
            </h2>
            <Link
              to="/shop"
              className="hover-underline-animation text-sm font-medium mt-4 md:mt-0"
            >
              View All Products
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-gray-100 dark:bg-zinc-800 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. FOOTER */}
      <section className="py-32 px-4 text-center bg-gray-50 dark:bg-zinc-900">
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6 text-gray-400">
          The Philosophy
        </p>
        <h2 className="text-3xl md:text-5xl font-serif italic mb-8 max-w-2xl mx-auto leading-tight text-gray-800 dark:text-gray-200">
          "Simplicity is the ultimate sophistication."
        </h2>
        <Link
          to="/about"
          className="text-sm font-medium border-b border-black dark:border-white pb-1 hover:opacity-50 transition-opacity"
        >
          Read Our Story
        </Link>
      </section>
    </div>
  );
}
