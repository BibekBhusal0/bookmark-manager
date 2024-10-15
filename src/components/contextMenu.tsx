import Menu, { MenuProps } from "@mui/material/Menu";
import Box, { BoxProps } from "@mui/material/Box";
import { cn } from "@lib/utils";
import { ReactNode, useState, MouseEvent } from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Icon } from "@iconify/react";

export type contextMenuProps = {
  children?: ReactNode;
  menuProps?: Partial<MenuProps>;
  containerProps?: BoxProps;
  menuContent?: ReactNode;
};

export default function ContextMenu({
  menuProps,
  containerProps,
  menuContent,
  children,
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

type AddFavProps = {
  addItem: () => void;
  added: boolean;
} & contextMenuProps;

export function AddFavoriteContextMenu({
  addItem,
  added,
  ...props
}: AddFavProps) {
  return (
    <ContextMenu
      {...props}
      menuContent={
        <MenuItem onClick={addItem}>
          <ListItemIcon>
            <Icon
              className="text-3xl"
              icon={added ? "mdi:heart-outline" : "mdi:heart"}
            />
          </ListItemIcon>
          <div className="text-2xl">
            {added ? "Remove from " : "Add to "}
            Favorites
          </div>
        </MenuItem>
      }
    />
  );
}
