import {
  FunctionComponent,
  Key,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@src/reducer/store";
import { Icon } from "@iconify/react";
import { faviconURL } from "@src/lib/faviconURL";
import { changeCurrentFolder } from "@src/reducer/mainSlice";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

function BookmarkSearch() {
  const dispatch = useDispatch();
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

  const handleChange = (e: Key | null) => {
    if (!e) return;
    const bookmark = searchedBookmarks.find((bookmark) => bookmark.id === e);
    if (!bookmark) return;
    if (bookmark.url) {
      window.open(bookmark.url, "_blank");
    } else {
      dispatch(changeCurrentFolder(bookmark.id));
    }
    setSearchTerm("");
  };

  return (
    <Autocomplete
      value={searchTerm}
      onValueChange={setSearchTerm}
      onSelectionChange={handleChange}
      items={searchedBookmarks}
      defaultItems={searchedBookmarks}
      placeholder="Search Bookmarks"
      isClearable={false}
      listboxProps={{
        emptyContent:
          searchTerm.trim() === "" ? "Search Something" : "No Bookmark Found",
      }}>
      {(bookmark: chrome.bookmarks.BookmarkTreeNode) => (
        <AutocompleteItem key={bookmark.id}>
          <Link link={bookmark} />
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

interface LinkProps {
  link: chrome.bookmarks.BookmarkTreeNode;
}

const Link: FunctionComponent<LinkProps> = ({ link }) => {
  const { favorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );

  const { title, url, id } = link;
  const cls = "w-10 aspect-square";
  const icon = url ? (
    <img className={cls} src={faviconURL(url)} />
  ) : (
    <Icon className={cls} icon="ic:round-folder" />
  );

  return (
    <div className="size-full flex gap-4 items-center text-xl">
      {icon}
      <div className="text-xl truncate">{title}</div>
      {favorites.includes(id) && (
        <>
          <div className="flex-grow"></div>
          <Icon className="text-2xl flex-shrink-0" icon="mdi:heart" />
        </>
      )}
    </div>
  );
};

export default BookmarkSearch;
