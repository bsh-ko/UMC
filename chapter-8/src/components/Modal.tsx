// import { useDispatch, useSelector } from "../hooks/useCustomRedux";
// import { closeModal } from "../slices/modalSlice";
// import { clearCart } from "../slices/cartSlice";
import { useModalStore } from "../hooks/useModalStore";
import { useCartAction } from "../hooks/useCartStore";

const Modal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { clearCart } = useCartAction();
  // const dispatch = useDispatch();
  // const isOpen = useSelector((state) => state.modal.isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm  flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl space-y-4 text-center">
        <p className="text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-6">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
            아니요
          </button>
          <button
            onClick={() => {
              clearCart();
              closeModal();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
