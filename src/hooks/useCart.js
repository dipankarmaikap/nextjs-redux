import { useSelector, useDispatch } from "react-redux";
import { actions } from "@/redux/cartSlice";
export default function useCart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCart = (item) => dispatch(actions.addToCart(item));
  const removeFromCart = (id) => dispatch(actions.removeFromCart(id));
  const adjustItemInCart = (item) => dispatch(actions.adjustItemInCart(item));
  return {
    cart,
    addToCart,
    removeFromCart,
    adjustItemInCart,
  };
}
