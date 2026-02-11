/*eslint-disable*/
import { type Product } from "../../types";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  priority?: boolean; // <--- Nueva prop opcional
}

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const addItem = useCartStore((state: any) => state.addItem);

  // Función para manejar el clic del botón SIN activar el Link
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // <--- ESTO EVITA QUE EL LINK SE ACTIVE
    e.stopPropagation();
    addItem(product, "M"); // Agrega talla por defecto o abre modal
    toast.success("Added to cart");
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group cursor-pointer block relative"
    >
      <div className="group cursor-pointer">
        {/* Contenedor de Imagen con Overflow Hidden para el zoom */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 dark:bg-zinc-800 mb-4">
          <img
            src={product.image}
            alt={product.title}
            // LÓGICA INTELIGENTE:
            // Si tiene prioridad -> "eager" (rápido) y "high"
            // Si no -> "lazy" (ahorro de datos)
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Botón "Add" que aparece al hacer hover (Estilo Zara/H&M) */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white dark:bg-black text-black dark:text-white p-2 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black z-10"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Info del Producto */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-foreground truncate pr-4">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 capitalize">{product.category}</p>
        </div>
      </div>
    </Link>
  );
}
