import {
  allFolderSizes,
  changeFolderSize,
  folderSizes,
} from "@reducer/mainSlice";
import { Select, SelectItem, SelectProps } from "@nextui-org/select";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@src/reducer/store";

export default function SelectSize({
  boxProps,
  ...props
}: { boxProps?: JSX.IntrinsicElements["div"] } & Partial<SelectProps>) {
  const dispatch = useDispatch();
  const { folderSize } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );
  return (
    <div {...boxProps} style={{ minWidth: 120, ...boxProps?.style }}>
      <Select
        label="Size"
        size="sm"
        {...props}
        value={folderSize}
        defaultSelectedKeys={[folderSize]}
        classNames={{ value: "capitalize" }}
        onChange={(s) => {
          const val = s.target.value as folderSizes;
          if (!allFolderSizes.includes(val)) return;
          dispatch(changeFolderSize(val));
        }}
        //
      >
        {allFolderSizes.map((s) => (
          <SelectItem className="capitalize" key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
