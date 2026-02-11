import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

export default function FloatingCart() {
  const { toggleCart, items } = useCartStore();

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 right-6 z-[40] p-4 rounded-full shadow-lg transition-all duration-300 group
      /* EFECTO GLASS TRANSPARENTE */
      bg-white/10 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10
      hover:bg-white/20 dark:hover:bg-black/30 hover:scale-105 active:scale-95"
    >
      <div className="relative text-black dark:text-white">
        <ShoppingBag size={24} />
        {items.length > 0 && (
          <span className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border border-white/20">
            {items.length}
          </span>
        )}
      </div>
    </button>
  );
}
