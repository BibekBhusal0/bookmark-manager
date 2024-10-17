import { LinkContextMenu } from "@components/contextMenu";
import Folder from "@components/folder";
import { changeCurrentFolder, toggleFavorites } from "@reducer/mainSlice";
import { StateType } from "@reducer/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faviconURL } from "@src/lib/faviconURL";
import { TakeBookmarksProps } from "@src/reducer/allBookmark";

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
    <LinkContextMenu id={bookmarks.id}>
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
        <IconButton onClick={toggleItem}>
          <Icon className="text-3xl" icon="mdi:heart" />
        </IconButton>
      )}
    </LinkContextMenu>
  );
}

function BookmarkFolder({
  bookmarks,
}: {
  bookmarks: chrome.bookmarks.BookmarkTreeNode;
}) {
  const [open, setOpen] = useState(
    bookmarks.id === "1" || bookmarks.id === "0"
  );
  const dispatch = useDispatch();
  const changeFolder = () => {
    if (!open) {
      dispatch(changeCurrentFolder(bookmarks.id));
    }
  };
  if (!bookmarks.children) return null;
  return (
    <Accordion
      sx={{
        background: "transparent",
        "& .MuiAccordionSummary-root": {
          display: "block",
        },
        "& .MuiAccordionDetails-root": {
          paddingRight: "0px",
          paddingLeft: "15px",
        },
        "& .MuiAccordion-root::before": {
          display: "none",
        },
      }}
      expanded={open}
      disableGutters
      onChange={(_, e) => setOpen(e)}
      elevation={0}
      className="relative">
      <AccordionSummary
        sx={{ gap: "20px", padding: "0px" }}
        onClick={changeFolder}>
        <div className="flex w-full items-center flex-start gap-4">
          <div className="aspect-square h-full">
            <Folder open={open} />
          </div>
          <div className="text-2xl truncate">{bookmarks.title}</div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {bookmarks.children.map((child: any) => (
          <BookmarkItem key={child.id} bookmarks={child} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
export default BookmarkTree;
