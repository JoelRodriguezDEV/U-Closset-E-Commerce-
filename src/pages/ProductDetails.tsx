/*eslint-disable*/
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { type Product } from "../types";
import { ShoppingBag, ArrowLeft, Star, Truck, ShieldCheck } from "lucide-react";
// Usamos any temporalmente para evitar el error de tipos que mencionaste
import { useCartStore } from "../store/useCartStore";
import { toast } from "sonner";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");

  const addItem = useCartStore((state: any) => state.addItem);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        // CORRECCIÓN FINAL:
        // Usamos la variable TAL CUAL viene de Vercel.
        // Si en Vercel pusiste "https://...railway.app", usará esa.
        // Si pusiste "https://...railway.app/api", usará esa.
        // Ya no forzamos nada.
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

        // Importante: Quitamos cualquier lógica que agregue "/api" automáticamente.
        const response = await axios.get(`${apiUrl}/products/${id}`);

        setProduct(response.data);
      } catch (error) {
        console.error("Error cargando producto:", error);
        toast.error("Could not load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-sm font-medium tracking-widest">
        LOADING...
      </div>
    );
  if (!product) return null;

  return (
    <div className="pt-24 pb-12 min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Imagen */}
          <div className="w-full flex items-center justify-center bg-transparent">
            <img
              src={product.image}
              alt={product.title}
              loading="eager"
              // @ts-ignore
              fetchPriority="high"
              className="max-h-[500px] w-auto object-contain mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col pt-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                {product.category}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 leading-snug">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-zinc-800">
              <p className="text-xl font-semibold">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center text-yellow-500 text-xs">
                <Star size={14} fill="currentColor" />
                <span className="ml-1 font-medium text-gray-600 dark:text-gray-400">
                  4.8 (120 reviews)
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 text-justify">
              {product.description}
            </p>

            {!product.category.toLowerCase().match(/electronic|jewelery/) && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Size
                  </span>
                  <button className="text-xs text-gray-400 underline decoration-gray-300">
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-3">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 flex items-center justify-center text-xs font-medium border transition-all
                        ${
                          selectedSize === size
                            ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                            : "border-gray-200 text-gray-500 hover:border-black dark:border-zinc-800 dark:hover:border-white"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={() => {
                  if (product) {
                    addItem(product, selectedSize);
                    toast.success(`${product.title} added to cart`, {
                      description: `Size: ${selectedSize}`,
                      duration: 2000,
                    });
                  }
                }}
                className="w-full bg-black dark:bg-white text-white dark:text-black h-12 rounded-sm font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>

              <div className="flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest text-gray-400 mt-4">
                <span className="flex items-center gap-2">
                  <Truck size={14} /> Free Shipping
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck size={14} /> Secure Payment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
