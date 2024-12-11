import { LinkContextMenu } from "@components/contextMenu";
import Folder from "@components/folder";
import { changeCurrentFolder, toggleFavorites } from "@reducer/mainSlice";
import { StateType } from "@reducer/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import IconButton from "@src/components/iconButton";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faviconURL } from "@src/lib/faviconURL";
import { TakeBookmarksProps } from "@src/reducer/allBookmark";
import type { SharedSelection } from "@nextui-org/system";

function BookmarkTree() {
  const { bookmarks } = useSelector((state: StateType) => state.allBookmarks);
  return <BookmarkItem bookmarks={bookmarks} />;
}

function BookmarkItem({ bookmarks }: TakeBookmarksProps) {
  if (Array.isArray(bookmarks))
    return bookmarks.map((child) => (
      <BookmarkItem key={child.id} bookmarks={child} />
    ));
  if (bookmarks.children) return <BookmarkFolder bookmarks={bookmarks} />;
  return <BookmarkTreeLink bookmarks={bookmarks} />;
}

function BookmarkTreeLink({
  bookmarks,
}: {
  bookmarks: chrome.bookmarks.BookmarkTreeNode;
}) {
  const { favorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );
  const dispatch = useDispatch();
  const fav = favorites.includes(bookmarks.id);
  const toggleItem = () => dispatch(toggleFavorites(bookmarks.id));

  return (
    <LinkContextMenu
      id={bookmarks.id}
      triggerProps={{
        className: "flex items-center gap-4",
      }}>
      <a
        style={{ width: fav ? `calc(100% - 46px)` : "100%" }}
        className="flex items-center gap-4 my-4"
        href={bookmarks.url}
        target="_blank">
        <img
          className="size-10 aspect-square"
          src={faviconURL(bookmarks.url || "")}
          alt={bookmarks.title}
        />

        <div className="text-xl truncate">{bookmarks.title}</div>
      </a>
      {fav && (
        <IconButton onPress={toggleItem}>
          <Icon className="text-3xl" icon="mdi:heart" />
        </IconButton>
      )}
    </LinkContextMenu>
  );
}

type bookmarkFolderProps = { bookmarks: chrome.bookmarks.BookmarkTreeNode };
function BookmarkFolder({ bookmarks }: bookmarkFolderProps) {
  const [open, setOpen] = useState(
    bookmarks.id === "1" || bookmarks.id === "0"
  );
  const toggleOpen = () => setOpen(!open);
  const dispatch = useDispatch();
  const changeFolder = () => {
    dispatch(changeCurrentFolder(bookmarks.id));
  };
  if (!bookmarks.children) return null;
  return (
    <Accordion
      selectedKeys={open ? "all" : []}
      className="pl-4 pr-0"
      onSelectionChange={toggleOpen}>
      <AccordionItem
        hideIndicator
        classNames={{ title: "text-2xl" }}
        key={bookmarks.id}
        onPress={changeFolder}
        title={bookmarks.title}
        startContent={<Folder open={open} />}>
        {bookmarks.children.map((child: any) => (
          <BookmarkItem key={child.id} bookmarks={child} />
        ))}
      </AccordionItem>
    </Accordion>
  );
}
export default BookmarkTree;
