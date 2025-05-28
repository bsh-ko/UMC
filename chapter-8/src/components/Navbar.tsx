import { FaShoppingCart } from "react-icons/fa";
// import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
// import { calculateTotals } from "../slices/cartSlice";
import { useCartAction, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  // zustand 사용으로 수정
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartAction();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  // const { amount, cartItems } = useSelector((state) => state.cart);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(calculateTotals());
  // }, [dispatch, cartItems]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        className="text-2xl font-semibold cursor-pointer"
      >
        Bren
      </h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
