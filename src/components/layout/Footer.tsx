import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white border-t border-gray-100 dark:border-zinc-800 pt-20 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Columna 1: Brand & Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tighter block mb-6"
            >
              UC STORE
            </Link>
            <p className="text-gray-500 text-sm mb-6">
              Essential wardrobe for the modern minimalist. Designed in
              Dominican Republic.
            </p>

            {/* Newsletter Input */}
            <form className="flex flex-col gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <div className="flex border-b border-black dark:border-white pb-1">
                <input
                  type="email"
                  id="footer-email"
                  placeholder="Subscribe for news"
                  className="bg-transparent w-full outline-none text-sm placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="text-xs font-bold uppercase tracking-widest hover:opacity-50"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

          {/* Columna 2: Shop */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-6">
              Shop
            </h3>
            <ul className="space-y-4 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
              <li>
                <Link
                  to="/shop?category=women"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=men"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=jewelery"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Help */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-6">
              Help
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Company */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-6">
              Company
            </h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  About UC
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-zinc-800">
          <p className="text-xs text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} U Closset Store. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
