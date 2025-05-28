import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice";

//중앙 저장소 생성
function createStore() {
  const store = configureStore({
    // 리듀서 설정
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });

  return store;
}

// store를 활용할 수 있도록 내보내야 함
// 여기서 실행해서 스토어를 뺴준다
// SingleTon 패턴
const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
