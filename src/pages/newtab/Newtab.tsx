import { useEffect } from "react";
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
import BookmarkSearch from "@src/bookmarks/search";
import { setAllBookmarks } from "@src/reducer/allBookmark";

function App() {
  const { bookmarks } = useSelector((state: StateType) => state.allBookmarks);
  const dispatch = useDispatch();

  const fetchBookmarks = () => {
    chrome.bookmarks.getTree().then((data) => {
      dispatch(setAllBookmarks(data));
    });
  };

  useEffect(() => {
    fetchBookmarks();

    const onBookmarkCreated = () => fetchBookmarks();
    const onBookmarkRemoved = () => fetchBookmarks();
    const onBookmarkChanged = () => fetchBookmarks();

    chrome.bookmarks.onCreated.addListener(onBookmarkCreated);
    chrome.bookmarks.onRemoved.addListener(onBookmarkRemoved);
    chrome.bookmarks.onChanged.addListener(onBookmarkChanged);
    return () => {
      chrome.bookmarks.onCreated.removeListener(onBookmarkCreated);
      chrome.bookmarks.onRemoved.removeListener(onBookmarkRemoved);
      chrome.bookmarks.onChanged.removeListener(onBookmarkChanged);
    };
  }, []);

  if (!bookmarks || bookmarks.length === 0) return <ThemeSwitch />;

  return (
    <Sidebar
      showButton
      resizableBoxProps={{
        children: (
          <div className="overflow-x-hidden overflow-y-auto h-screen px-4 styled-scrollbar">
            <FavButton />
            <BookmarkTree />
          </div>
        ),
      }}
      headerProps={{ className: "relative h-20" }}
      header={
        <>
          <BookmarkSearch />
          <ThemeSwitch />
          <SelectSize />
        </>
      }
      containerProps={{ className: "size-full h-screen" }}
      contentContainerProps={{ className: "h-screen gap-0 pl-4" }}
      children={<MainBookmarks />}
    />
  );
}

function FavButton() {
  const dispatch = useDispatch();
  const { showFavorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );
  return (
    <div className="flex-center w-full">
      <Button
        sx={{ marginX: "auto", marginY: "1rem" }}
        className="transition-all"
        variant={showFavorites ? "outlined" : "contained"}
        onClick={() => dispatch(toggleShowFavorites())}>
        <div className="text-xl flex-center gap-2">
          <Icon icon="mdi:heart-outline" />
          <div>{showFavorites ? "Hide " : "Show "} All Favorites</div>
        </div>
      </Button>
    </div>
  );
}
export default App;
