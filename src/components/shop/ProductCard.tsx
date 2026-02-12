/*eslint-disable*/
import { type Product } from "../../types";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
// CORRECCIÓN 1: La ruta correcta es ../../ (subir 2 niveles)
import { useCartStore } from "../../store/useCartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const addItem = useCartStore((state: any) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, "M");
    toast.success("Added to cart");
  };

  return (
    <div className="group cursor-pointer block relative">
      {/* CORRECCIÓN 2: Cambiamos /product por /shop para coincidir con App.tsx */}
      <Link to={`/shop/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 dark:bg-zinc-800 mb-4">
          <img
            src={product.image}
            alt={product.title}
            loading={priority ? "eager" : "lazy"}
            // @ts-ignore
            fetchPriority={priority ? "high" : "auto"}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className="absolute top-[65%] right-4 bg-white dark:bg-black text-black dark:text-white p-2 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black z-20"
      >
        <Plus size={20} />
      </button>

      {/* CORRECCIÓN 3: Aquí también cambiamos a /shop */}
      <Link to={`/shop/${product.id}`} className="space-y-1">
        <h3 className="text-sm font-medium text-foreground truncate pr-4">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-xs text-gray-400 capitalize">{product.category}</p>
      </Link>
    </div>
  );
}
