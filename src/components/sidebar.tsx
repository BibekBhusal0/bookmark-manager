import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { cn } from "@src/lib/utils";
import Box, { BoxProps } from "@mui/material/Box";
import { useTheme, emphasize } from "@mui/material/styles";

export type SidebarProps = {
  resizableBoxProps?: Partial<ResizableBoxProps>;
  containerProps?: BoxProps;
  contentContainerProps?: BoxProps;
  headerProps?: BoxProps;
  showButton?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;
};

export default function Sidebar({
  resizableBoxProps,
  headerProps,
  showButton,
  header,
  children,
  contentContainerProps,
  containerProps,
}: SidebarProps) {
  const {
    palette: {
      primary: { main },
    },
  } = useTheme();

  const [drawerWidth, setDrawerWidth] = useState(600);
  const minW = 150;
  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    if (!open && drawerWidth <= minW) setDrawerWidth(minW);
    setOpen(!open);
  };

  return (
    <Box
      {...containerProps}
      className={cn("flex size-full", containerProps?.className)}>
      <ResizableBox
        width={open ? drawerWidth : 0}
        height={Infinity}
        minConstraints={[0, 0]}
        maxConstraints={[600, Infinity]}
        style={{ backgroundColor: emphasize(main, 0.7) }}
        axis="x"
        resizeHandles={["e"]}
        onResize={(e: any, { size }) => {
          setDrawerWidth(size.width);
          setOpen(size.width > minW ? true : e.movementX > 0);
        }}
        {...resizableBoxProps}
        className={cn(
          `relative h-full overflow-x-hidden overflow-y-auto text-ellipsis`,
          { "transition-all": !open },
          resizableBoxProps?.className
        )}
      />
      {/* {sidebarContent}
      </ResizableBox> */}
      <Box
        {...contentContainerProps}
        className={cn(
          "flex flex-col gap-4 w-full transition-all",
          contentContainerProps?.className
        )}>
        <Box
          {...headerProps}
          className={cn(
            "flex w-full items-center justify-between gap-4 p-4",
            headerProps?.className
          )}>
          {showButton && (
            <IconButton onClick={toggleOpen}>
              <Icon
                icon={
                  open
                    ? "material-symbols:menu-open-rounded"
                    : "material-symbols:menu-rounded"
                }
              />
            </IconButton>
          )}
          {header}
        </Box>
        {children}
      </Box>
    </Box>
  );
}
