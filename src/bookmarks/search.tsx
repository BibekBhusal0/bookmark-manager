import Autocomplete from "@mui/material/Autocomplete";
import { useDeferredValue, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";

function BookmarkSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedBookmarks, SetSearchedBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    chrome.bookmarks.search(deferredSearchTerm, (bookmarks) => {
      SetSearchedBookmarks(bookmarks);
      console.log(bookmarks);
    });
  }, [deferredSearchTerm]);

  return (
    <Autocomplete
      fullWidth
      inputValue={searchTerm}
      onInputChange={(_, value) => setSearchTerm(value || "")}
      options={searchedBookmarks.map((b) => b.title)}
      //   renderOption={(props, option) => {
      //     const bookmark = searchedBookmarks.find((b) => b.id === option);
      //     if (!bookmark) return null;
      //     return (
      //       <ListItem {...props} key={option}>
      //         {bookmark.title}
      //       </ListItem>
      //     );
      //   }}
      renderInput={(parms) => (
        <TextField {...parms} placeholder="Search Bookmarks" />
      )}
      //
    ></Autocomplete>
  );
}

export default BookmarkSearch;
