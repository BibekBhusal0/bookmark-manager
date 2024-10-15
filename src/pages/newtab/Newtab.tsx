import { useEffect, useState } from "react";
import Sidebar from "@components/sidebar";
import BookmarkTree from "@bookmarks/tree";
import ThemeSwitch from "@theme/switch";
import MainBookmarks from "@bookmarks/main";
import SelectSize from "@bookmarks/size";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@reducer/store";
import { toggleShowFavorites } from "@reducer/mainSlice";

export async function getBookmarks(): Promise<
  chrome.bookmarks.BookmarkTreeNode[]
> {
  try {
    const response = await fetch("../src/data/chrome.json");
    const data = await response.json();
    return data as chrome.bookmarks.BookmarkTreeNode[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

function App() {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  useEffect(() => {
    if (bookmarks.length !== 0) return;
    getBookmarks().then((data) => {
      setBookmarks(data);
    });
  }, []);
  if (!bookmarks || bookmarks.length === 0) return <ThemeSwitch />;

  return (
    <Sidebar
      showButton
      resizableBoxProps={{
        children: (
          <div className="overflow-x-hidden overflow-y-auto h-screen px-4 styled-scrollbar">
            <FavButton />
            <BookmarkTree bookmarks={bookmarks} />
          </div>
        ),
      }}
      headerProps={{ className: "relative h-20" }}
      header={
        <>
          <div className="w-1/2 rounded-full bg-green-400 bg-opacity-60 h-full" />
          <ThemeSwitch />
          <SelectSize />
        </>
      }
      containerProps={{ className: "size-full h-screen" }}
      contentContainerProps={{ className: "h-screen gap-0" }}
      //
    >
      <MainBookmarks bookmarks={bookmarks} />
    </Sidebar>
  );
}

function FavButton() {
  const dispatch = useDispatch();
  const { showFavorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );
  return (
    <Button
      sx={{ marginX: "auto", marginY: "1rem" }}
      className="transition-all"
      variant={showFavorites ? "outlined" : "contained"}
      onClick={() => dispatch(toggleShowFavorites())}>
      <div className="text-2xl flex-center gap-2">
        <Icon icon="mdi:heart-outline" />
        <div>{showFavorites ? "Hide " : "Show "} All Favorites</div>
      </div>
    </Button>
  );
}
export default App;
