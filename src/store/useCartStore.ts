import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Product } from "../types";

interface CartItem extends Product {
  quantity: number;
  size?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size?: string) => void;
  decreaseItem: (productId: number) => void; // <--- 1. NUEVA FUNCIÓN
  removeItem: (productId: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size = "M") => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id,
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...currentItems, { ...product, quantity: 1, size }],
            isOpen: true,
          });
        }
      },

      // <--- 2. LÓGICA PARA RESTAR
      decreaseItem: (productId) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === productId);

        if (existingItem && existingItem.quantity > 1) {
          // Si tiene más de 1, restamos
          set({
            items: currentItems.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            ),
          });
        } else {
          // Si tiene 1 y restamos, lo eliminamos del carrito
          get().removeItem(productId);
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      toggleCart: () => set({ isOpen: !get().isOpen }),

      clearCart: () => set({ items: [] }),

      total: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "shopping-cart",
    },
  ),
);
