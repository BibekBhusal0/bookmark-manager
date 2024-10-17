import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./mainSlice";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { localStorage } from "redux-persist-webextension-storage";

const localStorageConfig = {
  key: "bookmark",
  storage: localStorage,
};

const rootReducer = combineReducers({
  bookmarkReducer: persistReducer(localStorageConfig, bookmarkReducer),
});

export const store = configureStore({
  reducer: {
    bookmarkReducer: persistReducer(localStorageConfig, bookmarkReducer),
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export const persistor = persistStore(store);
