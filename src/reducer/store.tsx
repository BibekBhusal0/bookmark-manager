import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./mainSlice";
import { persistStore, persistReducer } from "redux-persist";
import { localStorage } from "redux-persist-webextension-storage";
import allBookmarksReducer from "./allBookmark";

const localStorageConfig = {
  key: "bookmark",
  storage: localStorage,
};

export const store = configureStore({
  reducer: {
    allBookmarks: allBookmarksReducer,
    bookmarkReducer: persistReducer(localStorageConfig, bookmarkReducer),
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export const persistor = persistStore(store);
