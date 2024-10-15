import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@reducer/store";
import {
  allFolderSizes,
  changeFolderSize,
  folderSizes,
} from "@reducer/mainSlice";
import { useId } from "react";

export default function SelectSize() {
  const dispatch = useDispatch();
  const id = useId();
  const { folderSize } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(changeFolderSize(event.target.value as folderSizes));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={id}>Size</InputLabel>
        <Select
          labelId={id}
          value={folderSize}
          label="Size"
          onChange={handleChange}>
          {allFolderSizes.map((s) => (
            <MenuItem className="capitalize" key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
