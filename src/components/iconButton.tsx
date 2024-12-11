import { Button, ButtonProps } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";

const IconButton = (props: ButtonProps) => {
  return (
    <Button
      rounded="full"
      variant="light"
      {...props}
      className={cn(
        "p-1 min-w-2 min-h-2 rounded-full text-2xl aspect-square ",
        props.className
      )}
    />
  );
};

export default IconButton;
