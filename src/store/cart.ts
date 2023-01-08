import create from 'zustand';
import { persist } from 'zustand/middleware';
export interface CartParams {
    price: number,
    quantity: number,
    id: string
}
export interface Cart {
    total: number,
    totalqty: number,
    cartContent: CartParams[]
}
const useCart = create(
  persist<Cart>(
    (set, get) => ({
      total: 0,
      totalqty: 0,
      cartContent: [],
      addTocart: (params: CartParams) => {
        set((state) => ({
          totalqty: state.totalqty + 1,
          total: state.total + params.price,
          cartContent: [...state.cartContent, params],
        }));
      },
      updatecart: ({ params, mycart }: {params: CartParams, mycart: CartParams[]}) => {
        set((state) => ({
          totalqty: state.totalqty + 1,
          total: state.total + params.price,
          cartContent: mycart,
        }));
      },
      clearCart: () => set({ totalqty: 0, total: 0, cartContent: [] }),
      removeFromCart: (params: CartParams) =>
        set((state) => ({
          total: state.total - params.price * params.quantity,
          totalqty: state.totalqty - params.quantity,
          cartContent: state.cartContent.filter(
            (item) => item.id !== params.id
          ),
        })),
    }),
    { name: 'cart' }
  )
);
export default useCart;