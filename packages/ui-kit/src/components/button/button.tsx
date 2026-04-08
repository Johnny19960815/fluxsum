"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90",
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/90",
        info: "bg-info text-info-foreground shadow-sm hover:bg-info/90",
        filled:
          "bg-muted text-foreground shadow-sm hover:bg-muted/80",
        borderless:
          "text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 text-base",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
      },
      block: {
        true: "w-full",
        false: "",
      },
      glass: {
        true: "bg-background/80 backdrop-blur-xl backdrop-saturate-150 border border-border/50",
        false: "",
      },
      shadow: {
        true: "shadow-lg hover:shadow-xl",
        false: "",
      },
      shine: {
        true: "shine",
        false: "",
      },
      danger: {
        true: "text-destructive hover:bg-destructive hover:text-destructive-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      block: false,
      glass: false,
      shadow: false,
      shine: false,
      danger: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      block,
      glass,
      shadow,
      shine,
      danger,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      icon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    const resolvedLeftIcon = loading ? (
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
    ) : (
      leftIcon ?? icon
    );

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, block, glass, shadow, shine, danger }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {resolvedLeftIcon}
        {children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
