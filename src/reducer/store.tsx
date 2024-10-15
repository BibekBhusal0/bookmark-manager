import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./mainSlice";

export const store = configureStore({ reducer: { bookmarkReducer } });
export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
