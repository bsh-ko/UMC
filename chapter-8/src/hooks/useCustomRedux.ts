import { useDispatch as useDefaultDispact, useSelector as useDefaultSelctor } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useDispatch = (): AppDispatch => useDefaultDispact();
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelctor;
