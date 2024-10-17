import { createSlice } from "@reduxjs/toolkit";

export interface TakeBookmarksProps {
  bookmarks:
    | chrome.bookmarks.BookmarkTreeNode[]
    | chrome.bookmarks.BookmarkTreeNode;
}

export interface BookmarkTree {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
}

const initialState: BookmarkTree = { bookmarks: [] };
const allBookmarksReducer = createSlice({
  initialState,
  name: "allBookmarks",
  reducers: {
    setAllBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
  },
});

export default allBookmarksReducer.reducer;
export const { setAllBookmarks } = allBookmarksReducer.actions;
