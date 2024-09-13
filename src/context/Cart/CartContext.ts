import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: number) => void;
  addItemToWishlist: (productId: number) => void;
  updateItemInCart: (productId: string, quantity: number) => void;
  removeItemInCart: (productId: string) => void;
  removeItemInWishlist: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  addItemToWishlist: () => {},
  updateItemInCart: () => {},
  removeItemInCart: () => {},
  removeItemInWishlist: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);
