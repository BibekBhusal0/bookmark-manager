import Autocomplete from "@mui/material/Autocomplete";
import {
  FunctionComponent,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import TextField from "@mui/material/TextField";
import { getBookmarks } from "@src/pages/newtab/Newtab";
import { findPathToRoot } from "./breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@src/reducer/store";
import { Icon } from "@iconify/react";
import { faviconURL } from "@src/lib/faviconURL";
import { Breadcrumbs } from "@mui/material";

// const allBookmarks = getBookmarks();

function BookmarkSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedBookmarks, SetSearchedBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    chrome.bookmarks.search(deferredSearchTerm, (bookmarks) => {
      SetSearchedBookmarks(bookmarks);
    });
  }, [deferredSearchTerm]);

  return (
    <Autocomplete
      fullWidth
      inputValue={searchTerm}
      onInputChange={(_, value) => setSearchTerm(value || "")}
      options={searchedBookmarks.map((b) => `${b.id} ${b.title}`)}
      renderOption={(props, option) => {
        const id = option.split(" ")[0];
        const bookmark = searchedBookmarks.find((b) => b.id === id);
        if (bookmark === undefined) return null;
        return (
          <li {...props}>
            <Link link={bookmark} />
          </li>
        );
      }}
      renderInput={(parms) => (
        <TextField {...parms} placeholder="Search Bookmarks" />
      )}
      //
    ></Autocomplete>
  );
}

interface LinkProps {
  link: chrome.bookmarks.BookmarkTreeNode;
}

const Link: FunctionComponent<LinkProps> = ({ link }) => {
  const { favorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const { title, url, id } = link;
  //   allBookmarks.then((b) => setBookmarks(b));
  const path = findPathToRoot(bookmarks, id);
  const icon = url ? (
    <img className="w-full aspect-square" src={faviconURL(url)} />
  ) : (
    <Icon className="w-full aspect-square" icon="ic:round-folder" />
  );

  return (
    <div className="size-full">
      {path.length !== 0 && (
        <Breadcrumbs>
          {path.map((item, index) => (
            <div key={index}>{item.title}</div>
          ))}
        </Breadcrumbs>
      )}
      <a
        href={url || "#"}
        target={url ? "_blank" : "_self"}
        className="flex gap-4 items-center text-xl">
        <div className="w-10">{icon}</div>
        <div className="text-xl truncate">{title}</div>
        {favorites.includes(id) && (
          <>
            <div className="flex-grow"></div>
            <Icon
              className="text-2xl self-end"
              icon="material-symbols:favorite"
            />
          </>
        )}
      </a>
    </div>
  );
};

export default BookmarkSearch;
