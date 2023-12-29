import { Product } from '@/payload-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartItem = {
  product: Product;
  quantity?: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (cartItem) => cartItem.product.id === item.product.id
          );

          if (existingItemIndex !== -1) {
            // El producto ya está en el carrito, actualiza la cantidad
            const updatedItems = [...state.items];
            const currentQuantity = updatedItems[existingItemIndex].quantity || 0;
            updatedItems[existingItemIndex].quantity =
              item.quantity !== undefined ? item.quantity : currentQuantity + 1;

            return { items: updatedItems };
          } else {
            // El producto no está en el carrito, agrégalo con cantidad 1
            const newItem = { ...item, quantity: 1 };

            return { items: [...state.items, newItem] };
          }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
