import { useColorScheme } from "@mui/material/styles";
import { Icon, IconProps } from "@iconify/react";
import { useRef, useEffect } from "react";
import { cn } from "@lib/utils";

function ThemeSwitch({ props = undefined }: { props?: IconProps }) {
  const { mode, setMode } = useColorScheme();
  const firstRender = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      firstRender.current = false;
    }, 1);
  }, []);

  if (!mode) return null;
  const startIcon =
    mode === "dark" ? "line-md:moon-filled-loop" : "line-md:sunny-filled-loop";
  const transitionIcon =
    mode === "light"
      ? "line-md:moon-filled-to-sunny-filled-loop-transition"
      : "line-md:sunny-filled-loop-to-moon-filled-loop-transition";

  const handleClick = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <Icon
      key={mode}
      icon={firstRender.current ? startIcon : transitionIcon}
      {...props}
      onClick={handleClick}
      className={cn("text-4xl cursor-pointer", props?.className)}
    />
  );
}

export default ThemeSwitch;
