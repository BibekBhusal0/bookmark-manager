import { Card } from "@nextui-org/card";
import { extendVariants } from "@nextui-org/system";

export const StyledCard = extendVariants(Card, {
  variants: {
    color: {
      default: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      danger: {},
    },
    variant: {
      solid: { base: "border-none" },
      bordered: { base: "bg-transparent border-md" },
      flat: { base: "bg-opacity-50 border-none" },
      faded: { base: "border-md" },
    },
  },
  defaultVariants: {
    color: "default",
    variant: "flat",
  },
  compoundVariants: [
    // solid
    {
      variant: "solid",
      color: "default",
      className: "bg-default text-default-foreground",
    },
    {
      variant: "solid",
      color: "primary",
      className: "bg-primary text-primary-foreground",
    },
    {
      variant: "solid",
      color: "secondary",
      className: "bg-secondary text-secondary-foreground",
    },
    {
      variant: "solid",
      color: "success",
      className: "bg-success text-success-foreground",
    },
    {
      variant: "solid",
      color: "danger",
      className: "bg-danger text-danger-foreground",
    },
    {
      variant: "solid",
      color: "warning",
      className: "bg-warning text-warning-foreground",
    },
    // bordered
    {
      variant: "bordered",
      color: "default",
      className: "border-default text-default",
    },
    {
      variant: "bordered",
      color: "primary",
      className: "border-primary text-primary",
    },
    {
      variant: "bordered",
      color: "default",
      className: "border-default text-default",
    },
    {
      variant: "bordered",
      color: "success",
      className: "border-success text-success",
    },
    {
      variant: "bordered",
      color: "danger",
      className: "border-danger text-danger",
    },
    {
      variant: "bordered",
      color: "warning",
      className: "border-warning text-warning",
    },
    // flat
    {
      variant: "flat",
      color: "default",
      className: "bg-default-50 text-default-600",
    },
    {
      variant: "flat",
      color: "primary",
      className: "bg-primary-50 text-primary-600",
    },
    {
      variant: "flat",
      color: "secondary",
      className: "bg-secondary-50 text-secondary-600",
    },
    {
      variant: "flat",
      color: "success",
      className: "bg-success-50 text-success-600",
    },
    {
      variant: "flat",
      color: "danger",
      className: "bg-danger-50 text-danger-600",
    },
    {
      variant: "flat",
      color: "warning",
      className: "bg-warning-50 text-warning-600",
    },
    // faded
    {
      variant: "faded",
      color: "default",
      className: "border-default-200 text-default-600 bg-default-50",
    },
    {
      variant: "faded",
      color: "primary",
      className: "border-primary-200 text-primary-600 bg-primary-50",
    },
    {
      variant: "faded",
      color: "secondary",
      className: "border-secondary-200 text-secondary-600 bg-secondary-50",
    },
    {
      variant: "faded",
      color: "success",
      className: "border-success-200 text-success-600 bg-success-50",
    },
    {
      variant: "faded",
      color: "danger",
      className: "border-danger-200 text-danger-600 bg-danger-50",
    },
    {
      variant: "faded",
      color: "warning",
      className: "border-warning-200 text-warning-600 bg-warning-50",
    },
  ],
});
