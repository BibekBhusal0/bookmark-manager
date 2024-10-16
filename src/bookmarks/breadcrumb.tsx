import { StateType } from "@reducer/store";
import { useDispatch, useSelector } from "react-redux";
import { findBookmark } from "./main";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { changeCurrentFolder } from "@reducer/mainSlice";

const getPathRoot = (
  bookmarks: chrome.bookmarks.BookmarkTreeNode[],
  id: string
) => {
  const path: chrome.bookmarks.BookmarkTreeNode[] = [];
  const currentFolder = findBookmark(bookmarks, id);
  if (!currentFolder) return path;
  path.push(currentFolder);
  const parentID = currentFolder.parentId;
  if (!parentID) return path;
  const parent = findBookmark(bookmarks, parentID);
  if (parent) {
    const parentPath = getPathRoot(bookmarks, parentID);
    path.push(...parentPath);
  }
  return path;
};

export const findPath = (
  bookmarks: chrome.bookmarks.BookmarkTreeNode[],
  id: string
) => {
  const path = getPathRoot(bookmarks, id).reverse();
  path.shift();
  return path || [];
};
function BookmarkBreadcrumb() {
  const { bookmarks } = useSelector((state: StateType) => state.allBookmarks);

  const { currentFolderID, showFavorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );
  const cls = "hover:underline cursor-pointer text-xl";
  const dispatch = useDispatch();

  if (showFavorites) return <div className={cls}> Favorites </div>;
  const path = findPath(bookmarks, currentFolderID);

  return (
    <Breadcrumbs>
      {path.map((item, index) => (
        <div
          key={index}
          className={cls}
          onClick={() => dispatch(changeCurrentFolder(item.id))}>
          {item.title}
        </div>
      ))}
    </Breadcrumbs>
  );
}

export default BookmarkBreadcrumb;
