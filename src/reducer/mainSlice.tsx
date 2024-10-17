import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const s = ["small", "medium", "large"] as const;
export type folderSizes = (typeof s)[number];
export const allFolderSizes: folderSizes[] = [...s];

export type bookmarkStateType = {
  favorites: string[];
  pinned: string;
  currentFolderID: string;
  showFavorites: boolean;
  folderSize: folderSizes;
};
const initialState: bookmarkStateType = {
  favorites: [],
  showFavorites: false,
  pinned: "1",
  currentFolderID: "1",
  folderSize: "medium",
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    toggleFavorites: (state, action: PayloadAction<string>) => {
      const fav = state.favorites;
      const newId = action.payload;
      if (!fav.includes(newId)) fav.push(newId);
      else state.favorites = fav.filter((id) => id !== newId);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    changeCurrentFolder: (state, action: PayloadAction<string>) => {
      state.currentFolderID = action.payload;
      state.showFavorites = false;
    },
    changeFolderSize: (state, action: PayloadAction<folderSizes>) => {
      state.folderSize = action.payload;
    },
    toggleShowFavorites: (state) => {
      state.showFavorites = !state.showFavorites;
    },
    //   changePined : (state, action:PayloadAction<string>) =>{
  },
});

export const {
  toggleFavorites,
  changeCurrentFolder,
  changeFolderSize,
  toggleShowFavorites,
  removeFavorite,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
