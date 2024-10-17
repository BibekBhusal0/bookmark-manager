import { StateType } from "@reducer/store";
import { useDispatch, useSelector } from "react-redux";
import { TakeBookmarksProps } from "./tree";
import {
  changeCurrentFolder,
  folderSizes,
  toggleFavorites,
} from "@reducer/mainSlice";
import Paper from "@mui/material/Paper";
import { Icon } from "@iconify/react";
import { cn } from "@lib/utils";
import { useEffect, useRef, useState } from "react";
import { AddFavoriteContextMenu } from "@components/contextMenu";
import BookmarkBreadcrumb from "./breadcrumb";
import { faviconURL } from "@src/lib/faviconURL";

const folderSizeMapping: Record<folderSizes, number> = {
  small: 80,
  medium: 120,
  large: 180,
};

export function findBookmark(
  bookmarks: chrome.bookmarks.BookmarkTreeNode[],
  id: string
): chrome.bookmarks.BookmarkTreeNode | undefined {
  for (const bookmark of bookmarks) {
    if (bookmark.id === id) {
      return bookmark;
    }
    if (Array.isArray(bookmark.children)) {
      const found = findBookmark(bookmark.children, id);
      if (found) {
        return found;
      }
    }
  }
}

function MainBookmarks({
  bookmarks,
}: {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
}) {
  const { currentFolderID, folderSize, showFavorites, favorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(400);
  const itemWidth = folderSizeMapping[folderSize];
  const gap = 16;

  useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    const handleResize = () => {
      if (divRef?.current) {
        const totalWidth = divRef.current.offsetWidth;
        const numItems = Math.floor((totalWidth + gap) / (itemWidth + gap));
        const finalWidth = numItems * (itemWidth + gap) - gap;
        setWidth(finalWidth);
      }
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [currentFolderID, folderSize]);

  const getBookmarks = () => {
    if (showFavorites) {
      const fav = favorites.map((id) => findBookmark(bookmarks, id));
      return fav.filter((id) => !!id);
    }
    return findBookmark(bookmarks, currentFolderID)?.children;
  };
  const currentBookmarks = getBookmarks();

  const content =
    !currentBookmarks || currentBookmarks.length === 0 ? (
      <div className="text-center text-3xl pt-4">
        No bookmarks in {showFavorites ? "Favorites" : "this folder"}
      </div>
    ) : (
      <div
        className={cn("flex flex-wrap mx-auto w-full")}
        style={{ gap }}
        //
      >
        <Bookmarks bookmarks={currentBookmarks} />
      </div>
    );

  return (
    <div
      ref={divRef}
      style={{
        maxHeight: `calc(100vh - 80px - ${gap}px)`,
      }}
      className="size-full overflow-auto styled-scrollbar pb-8">
      <div style={{ maxWidth: width }} className="mx-auto">
        <div className="py-4">
          <BookmarkBreadcrumb bookmarks={bookmarks} />
        </div>
        {content}
      </div>
    </div>
  );
}

function Bookmarks({ bookmarks }: TakeBookmarksProps) {
  const { folderSize, favorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );
  const dispatch = useDispatch();

  if (Array.isArray(bookmarks)) {
    return bookmarks.map((child) => (
      <Bookmarks key={child.id} bookmarks={child} />
    ));
  }
  const size = folderSizeMapping[folderSize];
  const cls = "flex-center flex-col gap-4 size-full relative p-1";
  const textCls = "px-2 truncate w-full text-center";
  const fav = favorites.includes(bookmarks.id);
  const toggleItem = () => dispatch(toggleFavorites(bookmarks.id));

  const content = bookmarks.children ? (
    <div
      onClick={() => {
        dispatch(changeCurrentFolder(bookmarks.id));
      }}
      className={cn(cls, "gap-2")}>
      <Icon width={size * 0.7} icon="ic:round-folder" />
      <div className={cn(textCls)}>{bookmarks.title}</div>
    </div>
  ) : (
    <AddFavoriteContextMenu added={fav} addItem={toggleItem}>
      <a className={cn(cls)} href={bookmarks.url} target="_blank">
        <img
          className="size-1/2 aspect-square"
          src={faviconURL(bookmarks.url || "", size)}
          alt={bookmarks.title}
        />
        <div className="flex items-center justify-between w-full">
          {fav && <Icon className="text-2xl" icon="mdi:heart" />}
          <div className={cn(textCls)}>{bookmarks.title}</div>
        </div>
      </a>
    </AddFavoriteContextMenu>
  );

  return (
    <Paper
      className="cursor-pointer"
      variant="outlined"
      sx={{
        width: size,
        height: size,
        fontSize: size / 10,
      }}>
      {content}
    </Paper>
  );
}

export default MainBookmarks;
