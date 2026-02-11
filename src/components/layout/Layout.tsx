import { type ReactNode } from "react";
import Navbar from "./Navbar";
import CartDrawer from "../cart/CartDrawer";
import FloatingCart from "../cart/FloatingCart";
import Footer from "./Footer";
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Toaster position="top-center" richColors theme="system" />
      <Navbar />
      <FloatingCart />
      <CartDrawer />
      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
