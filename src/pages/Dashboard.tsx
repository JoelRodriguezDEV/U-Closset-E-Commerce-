/* eslint-disable*/
import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  LogOut,
  Package,
  User as UserIcon,
  CreditCard,
  MapPin,
  Heart,
  HelpCircle,
  Settings,
  Truck,
  Clock,
  RotateCcw,
  MessageSquare,
  ChevronRight,
  Wallet,
  Ticket,
  Gift,
} from "lucide-react";

export default function Dashboard() {
  // --- LÓGICA DEL TEMA (Mantenemos esto) ---
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDark]);

  // --- DATOS MOCKUP (Simulación de backend) ---
  const userStats = {
    coupons: 4,
    points: 1250,
    wallet: 0.0,
    orders: {
      unpaid: 1,
      processing: 2,
      shipped: 0,
      returns: 0,
    },
  };

  return (
    <div className="pt-32 pb-20 min-h-screen max-w-6xl mx-auto px-4 sm:px-6">
      {/* 1. HEADER DEL PERFIL + NIVEL */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gray-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-2xl font-bold">
          JM
        </div>
        <div>
          <h1 className="text-2xl font-bold">Joel Miller</h1>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">
              Platinum Member
            </span>
            <span className="text-gray-500">Member since 2024</span>
          </div>
        </div>
      </div>

      {/* 2. MIS ACTIVOS (Wallet / Cupones / Puntos) - Estilo Shein */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl text-center border border-gray-100 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer group">
          <div className="flex justify-center mb-2 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
            <Ticket size={24} />
          </div>
          <p className="text-xl font-bold">{userStats.coupons}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Coupons
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl text-center border border-gray-100 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer group">
          <div className="flex justify-center mb-2 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
            <Gift size={24} />
          </div>
          <p className="text-xl font-bold">{userStats.points}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Points
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl text-center border border-gray-100 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer group">
          <div className="flex justify-center mb-2 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
            <Wallet size={24} />
          </div>
          <p className="text-xl font-bold">${userStats.wallet}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Wallet
          </p>
        </div>
      </div>

      {/* 3. ORDER TRACKER (Seguimiento de Pedidos) - CLAVE EN E-COMMERCE */}
      <section className="mb-10">
        <div className="flex justify-between items-end mb-4 px-1">
          <h2 className="text-lg font-bold">My Orders</h2>
          <button className="text-xs text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-1">
            View All <ChevronRight size={12} />
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-5 gap-2 text-center">
            {/* Status: Unpaid */}
            <button className="flex flex-col items-center gap-2 group relative">
              <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-full group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <CreditCard size={20} />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Unpaid
              </span>
              {userStats.orders.unpaid > 0 && (
                <span className="absolute top-0 right-2 md:right-8 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {userStats.orders.unpaid}
                </span>
              )}
            </button>

            {/* Status: Processing */}
            <button className="flex flex-col items-center gap-2 group relative">
              <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-full group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <Package size={20} />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Processing
              </span>
              {userStats.orders.processing > 0 && (
                <span className="absolute top-0 right-2 md:right-8 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {userStats.orders.processing}
                </span>
              )}
            </button>

            {/* Status: Shipped */}
            <button className="flex flex-col items-center gap-2 group">
              <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-full group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <Truck size={20} />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Shipped
              </span>
            </button>

            {/* Status: Review */}
            <button className="flex flex-col items-center gap-2 group">
              <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-full group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <MessageSquare size={20} />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Review
              </span>
            </button>

            {/* Status: Returns */}
            <button className="flex flex-col items-center gap-2 group">
              <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-full group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <RotateCcw size={20} />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Returns
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. MENÚ DE GESTIÓN (Servicios) */}
      <h2 className="text-lg font-bold mb-4 px-1">More Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Address Book */}
        <button className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all text-left">
          <div className="p-3 bg-white dark:bg-black rounded-full shadow-sm">
            <MapPin size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">Address Book</h3>
            <p className="text-xs text-gray-500">Manage shipping addresses</p>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        {/* Payment Methods */}
        <button className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all text-left">
          <div className="p-3 bg-white dark:bg-black rounded-full shadow-sm">
            <CreditCard size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">Payment Methods</h3>
            <p className="text-xs text-gray-500">Manage your cards</p>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        {/* Wishlist */}
        <button className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all text-left">
          <div className="p-3 bg-white dark:bg-black rounded-full shadow-sm">
            <Heart size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">Wishlist</h3>
            <p className="text-xs text-gray-500">Your favorite items</p>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        {/* Support */}
        <button className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all text-left">
          <div className="p-3 bg-white dark:bg-black rounded-full shadow-sm">
            <HelpCircle size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">Support Center</h3>
            <p className="text-xs text-gray-500">Returns & FAQ</p>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>

      {/* 5. PREFERENCIAS Y LOGOUT (Abajo del todo) */}
      <div className="border-t border-gray-100 dark:border-zinc-800 pt-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-zinc-900 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors w-full md:w-auto justify-center"
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
            <span className="text-sm font-medium">
              {isDark ? "Dark Mode" : "Light Mode"}
            </span>
          </button>

          {/* Logout */}
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium px-6 py-3 w-full md:w-auto justify-center">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
