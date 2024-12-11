import { StateType } from "@reducer/store";
import { useDispatch, useSelector } from "react-redux";
import { TakeBookmarksProps } from "@reducer/allBookmark";
import { changeCurrentFolder, folderSizes } from "@reducer/mainSlice";
import { Icon } from "@iconify/react";
import { cn } from "@lib/utils";
import { useEffect, useRef, useState } from "react";
import { LinkContextMenu } from "@components/contextMenu";
import BookmarkBreadcrumb from "./breadcrumb";
import { faviconURL } from "@src/lib/faviconURL";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { StyledCard } from "@src/components/card";

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

function MainBookmarks() {
  const { bookmarks } = useSelector((state: StateType) => state.allBookmarks);
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
          <BookmarkBreadcrumb />
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

  const title = <div className={cn(textCls)}>{bookmarks.title}</div>;
  const content = bookmarks.children ? (
    <div
      onClick={() => {
        dispatch(changeCurrentFolder(bookmarks.id));
      }}
      className={cn(cls, "gap-2")}>
      <Icon width={size * 0.7} icon="ic:round-folder" />
      {title}
    </div>
  ) : (
    <LinkContextMenu
      triggerProps={{ className: cn("size-full relative") }}
      id={bookmarks.id}>
      <a className={cn(cls)} href={bookmarks.url} target="_blank">
        <img
          className="w-1/2 aspect-square"
          src={faviconURL(bookmarks.url || "", size)}
          alt={bookmarks.title}
        />
        <div className="flex items-center justify-between w-full">
          {fav && <Icon className="text-2xl" icon="mdi:heart" />}
          {title}
        </div>
      </a>
    </LinkContextMenu>
  );

  return (
    <StyledCard
      color="primary"
      variant="flat"
      className="cursor-pointer"
      style={{ width: size, height: size, fontSize: size / 10 }}
      isPressable>
      {content}
    </StyledCard>
  );
}

export default MainBookmarks;
