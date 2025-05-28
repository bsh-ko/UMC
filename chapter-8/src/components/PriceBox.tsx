import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";

const Pricebox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(clearCart());
  };

  const open = () => {
    dispatch(openModal());
  };

  return (
    <div className="flex justify-center p-8">
      <div className="flex justify-between p-20 w-full max-w-5xl items-center">
        <button onClick={open} className="border p-4 rounded-md cursor-pointer">
          장바구니 초기화
        </button>
        <div className="bg-white shadow-md rounded-2xl border border-gray-200 px-8 py-6 text-lg font-semibold text-gray-800">
          총 가격: <span className="font-bold ml-2">{total} 원</span>
        </div>
      </div>
    </div>
  );
};

export default Pricebox;
