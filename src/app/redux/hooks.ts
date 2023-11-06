import { useAppSelector, useAppDispatch } from "../redux/store";
import { addItem, removeItem } from "./features/cartSlice";

export function useCart() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const addProductToCart = (product) => {
    dispatch(addItem(product));
  };

  const removeProductFromCart = (productId) => {
    dispatch(removeItem(productId));
  };

  return {
    cart,
    addProductToCart,
    removeProductFromCart,
  };
}
