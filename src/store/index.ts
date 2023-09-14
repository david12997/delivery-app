import { configureStore, combineReducers } from "@reduxjs/toolkit";

import CotizacionSliceReducer from './cotizacion';
import ConductorSliceReducer from './conductor';

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux/es/types";

const rootReducer = combineReducers({
    cotizacion: CotizacionSliceReducer,
    conductor: ConductorSliceReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;