import { FunctionComponent } from "react";
import { cn } from "@lib/utils";
import { useTheme } from "@mui/material/styles";

interface FolderProps {
  open?: boolean;
  controlled?: boolean;
}

const Folder: FunctionComponent<FolderProps> = ({
  open = false,
  controlled = true,
}: FolderProps) => {
  const {
    palette: {
      error: { light, dark },
      text: { primary },
    },
  } = useTheme();
  const commonCls = "transition transform overflow-visible";

  return (
    <div
      className={cn(commonCls, "group relative")}
      //
    >
      <svg
        width="36"
        height="30"
        viewBox="0 0 36 30"
        stroke={primary}
        xmlns="http://www.w3.org/2000/svg"
        className={cn(commonCls, "group size-full relative")}>
        <path
          className={cn(commonCls, "origin-bottom-right", {
            "group-hover:skew-x-[10deg]": !controlled,
            "skew-x-[10deg]": controlled && open,
          })}
          d="M0 1.8C0 0.805886 0.805887 0 1.8 0H11.5284C12.1887 0 12.796 0.361581 13.1108 0.942101L14.2492 3.04205C14.564 3.62257 15.1713 3.98415 15.8316 3.98415H34.2C35.1941 3.98415 36 4.79003 36 5.78415V27.9C36 28.8941 35.1941 29.7 34.2 29.7H1.8C0.805886 29.7 0 28.8941 0 27.9V1.8Z"
          fill={dark}
        />
        <rect
          className={cn(commonCls, "origin-bottom-left", {
            "group-hover:-skew-x-[20deg]": !controlled,
            "-skew-x-[25deg]": controlled && open,
          })}
          y="10"
          width="36"
          height="19.7"
          rx="1.8"
          fill={light}
        />
      </svg>
    </div>
  );
};

export default Folder;
