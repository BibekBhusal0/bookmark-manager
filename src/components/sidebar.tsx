import { Icon } from "@iconify/react";
import IconButton from "@src/components/iconButton";
import { useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { cn } from "@nextui-org/theme";

export type SidebarProps = {
  resizableBoxProps?: Partial<ResizableBoxProps>;
  containerProps?: JSX.IntrinsicElements["div"];
  contentContainerProps?: JSX.IntrinsicElements["div"];
  headerProps?: JSX.IntrinsicElements["div"];
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
  const [drawerWidth, setDrawerWidth] = useState(600);
  const minW = 150;
  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    if (!open && drawerWidth <= minW) setDrawerWidth(minW);
    setOpen(!open);
  };

  return (
    <div
      {...containerProps}
      className={cn("flex size-full sidebar", containerProps?.className)}>
      <ResizableBox
        width={open ? drawerWidth : 0}
        height={Infinity}
        minConstraints={[0, 0]}
        maxConstraints={[600, Infinity]}
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
      <div
        {...contentContainerProps}
        className={cn(
          "flex flex-col gap-4 w-full transition-all",
          contentContainerProps?.className
        )}>
        <div
          {...headerProps}
          className={cn(
            "flex w-full items-center justify-between gap-4 p-4 relative",
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
        </div>
        {children}
      </div>
    </div>
  );
}
