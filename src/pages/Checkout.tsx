import { useCartStore } from "../store/useCartStore";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Checkout() {
  // 1. IMPORTANTE: Traemos 'toggleCart' y 'isOpen' del store
  const { items, total, clearCart, toggleCart, isOpen } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Lógica para el botón "Back to Cart"
  const handleBackToCart = () => {
    // A. Regresamos a la página anterior
    navigate(-1);

    // B. Si el carrito está cerrado, lo abrimos para que el usuario lo vea al llegar
    if (!isOpen) {
      setTimeout(() => {
        toggleCart();
      }, 100); // Un mini retraso de 100ms para que la animación se vea fluida al cambiar de página
    }
  };

  if (items.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/shop"
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      clearCart();

      toast.success("Order confirmed successfully", {
        description: "Check your email for tracking details.",
        duration: 4000,
      });

      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BOTÓN BACK CORREGIDO */}
        <button
          onClick={handleBackToCart}
          className="flex items-center gap-2 text-sm text-gray-500 mb-8 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Cart
        </button>

        {/* ... (El resto del código del layout sigue igual) ... */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* COLUMNA 1: FORMULARIO */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

            <form onSubmit={handlePayment} className="space-y-8">
              <section>
                <h2 className="text-lg font-medium mb-4">
                  Contact Information
                </h2>
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md px-4 py-3 focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                />
              </section>

              <section>
                <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="col-span-1 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md px-4 py-3 outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="col-span-1 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md px-4 py-3 outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="col-span-2 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md px-4 py-3 outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="col-span-1 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md px-4 py-3 outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="col-span-1 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md px-4 py-3 outline-none"
                    required
                  />
                </div>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                <div className="border border-gray-200 dark:border-zinc-800 rounded-md p-4 flex items-center gap-4 bg-gray-50 dark:bg-zinc-900 opacity-70 cursor-not-allowed">
                  <CreditCard size={20} />
                  <span className="text-sm">
                    Credit Card (Stripe integration pending)
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck size={14} />
                  Payments are secure and encrypted.
                </div>
              </section>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? "Processing..." : `Pay $${total().toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* COLUMNA 2: RESUMEN (Sticky) */}
          <div className="h-fit">
            <div className="lg:sticky lg:top-32 bg-gray-50 dark:bg-zinc-900 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6 scrollbar-hide">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-white rounded-md overflow-hidden relative border border-gray-100 dark:border-zinc-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl-md">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 capitalize">
                        {item.category}
                      </p>
                      <p className="text-sm font-semibold mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <Truck size={14} /> <span>Free</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200 dark:border-zinc-800 mt-4">
                  <span>Total</span>
                  <span>${total().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
