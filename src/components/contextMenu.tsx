import { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@src/reducer/store";
import { toggleFavorites } from "@src/reducer/mainSlice";
import { ListboxItem, Listbox } from "@nextui-org/listbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "./contextMenuMain";

export type contextMenuProps = {
  children?: ReactNode;
  menuProps?: JSX.IntrinsicElements["div"];
  triggerProps?: JSX.IntrinsicElements["div"];
  menuContent?: ReactNode;
  closeOnClick?: boolean;
};

export default function SimpleContextMenu({
  menuProps,
  triggerProps,
  menuContent,
  children,
}: contextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger {...triggerProps}>{children}</ContextMenuTrigger>
      <ContextMenuContent {...menuProps}>{menuContent}</ContextMenuContent>
    </ContextMenu>
  );
}

type AddFavProps = { id: string } & contextMenuProps;

export function LinkContextMenu({ id, ...props }: AddFavProps) {
  const { favorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );
  const dispatch = useDispatch();
  const fav = favorites.includes(id);
  const toggleFav = () => dispatch(toggleFavorites(id));

  const items = [
    {
      name: fav ? "Remove From Favorites" : "Add To Favorites",
      icon: fav ? "mdi:heart-outline" : "mdi:heart",
      onClick: toggleFav,
    },
    {
      name: "Delete",
      icon: "material-symbols:delete",
      onClick: () => {
        chrome.bookmarks.remove(id);
      },
    },
  ];

  return (
    <SimpleContextMenu
      {...props}
      menuContent={
        <Listbox variant="bordered">
          {items.map(({ name, icon, onClick }) => {
            return (
              <ListboxItem
                color={name === "Delete" ? "danger" : "default"}
                className={name === "Delete" ? "text-danger" : ""}
                key={name}
                onPress={onClick}
                startContent={<Icon icon={icon} className="text-2xl" />}>
                {name}
              </ListboxItem>
            );
          })}
        </Listbox>
      }
    />
  );
}
