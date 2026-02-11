import { X, Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    toggleCart,
    removeItem,
    addItem,
    decreaseItem,
    total,
  } = useCartStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* 1. Fondo Oscuro con Blur (Glass effect) */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />

      {/* 2. El Cajón del Carrito */}
      <div className="relative w-full max-w-md bg-white dark:bg-black h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-black z-10">
          <h2 className="text-xl font-bold tracking-tight">
            Shopping Bag ({items.length})
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista de Productos (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-gray-500">Your bag is empty.</p>
              <button
                onClick={toggleCart}
                className="text-sm font-bold border-b border-black dark:border-white pb-1"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 animate-enter">
                <div className="w-24 h-32 bg-gray-100 dark:bg-zinc-800 rounded-sm overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-medium text-sm line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 capitalize">
                      {item.category || "Product"} — Size {item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-sm">
                      ${item.price.toFixed(2)}
                    </span>

                    {/* --- CONTROLES DE CANTIDAD (+/-) --- */}
                    <div className="flex items-center border border-gray-200 dark:border-zinc-800 rounded-full">
                      <button
                        onClick={() => decreaseItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-l-full transition-colors"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-8 text-center text-xs font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => addItem(item)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-r-full transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    {/* --- FIN CONTROLES --- */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Fijo */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 dark:border-zinc-800 p-6 bg-white dark:bg-black z-10">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Subtotal</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 text-center">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
              onClick={() => {
                toggleCart();
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
