import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "@/redux/counterSlice";
export default function useCounter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const incrementByOne = () => dispatch(increment());
  const decrementByOne = () => dispatch(decrement());
  const incrementByTen = () => dispatch(incrementByAmount(10));
  return {
    count,
    incrementByOne,
    decrementByOne,
    incrementByTen,
  };
}
