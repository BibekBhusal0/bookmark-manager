import Menu, { MenuProps } from "@mui/material/Menu";
import Box, { BoxProps } from "@mui/material/Box";
import { cn } from "@lib/utils";
import { ReactNode, useState, MouseEvent } from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@src/reducer/store";
import { toggleFavorites } from "@src/reducer/mainSlice";

export type contextMenuProps = {
  children?: ReactNode;
  menuProps?: Partial<MenuProps>;
  containerProps?: BoxProps;
  menuContent?: ReactNode;
  closeOnClick?: boolean;
};

export default function ContextMenu({
  menuProps,
  containerProps,
  menuContent,
  children,
  closeOnClick = true,
}: contextMenuProps) {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Box
      {...containerProps}
      onContextMenu={handleContextMenu}
      className={cn(
        "cursor-context-menu size-full",
        containerProps?.className
      )}>
      <Menu
        {...menuProps}
        open={contextMenu !== null}
        onClick={closeOnClick ? handleClose : undefined}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }>
        {menuContent}
      </Menu>
      {children}
    </Box>
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
    <ContextMenu
      {...props}
      menuContent={
        <>
          {items.map(({ name, icon, onClick }) => {
            const color = name === "Delete" ? "error.main" : "inherit";
            return (
              <MenuItem
                sx={{ color }}
                className="flex-center gap-3"
                key={name}
                onClick={onClick}>
                <ListItemIcon sx={{ color }}>
                  <Icon icon={icon} className="text-2xl" />
                </ListItemIcon>
                <Box sx={{ color }} className="text-xl">
                  {name}
                </Box>
              </MenuItem>
            );
          })}
        </>
      }
    />
  );
}
