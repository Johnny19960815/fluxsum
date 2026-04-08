"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "../tooltip/tooltip";

const actionIconVariants = cva(
  [
    "inline-flex items-center justify-center flex-none",
    "rounded-md transition-all duration-200 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-95 select-none overflow-hidden relative",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-accent",
        borderless: "text-muted-foreground hover:text-foreground hover:bg-transparent",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        filled: "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
      },
      size: {
        xs: "h-6 w-6",
        small: "h-8 w-8",
        default: "h-9 w-9",
        middle: "h-9 w-9",
        large: "h-10 w-10",
        lg: "h-10 w-10",
        xl: "h-12 w-12",
      },
      active: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
      glass: {
        true: "bg-background/80 backdrop-blur-xl backdrop-saturate-150 border border-border/50",
        false: "",
      },
      shadow: {
        true: "shadow-md hover:shadow-lg",
        false: "",
      },
      danger: {
        true: "text-destructive hover:bg-destructive hover:text-destructive-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
      active: false,
      glass: false,
      shadow: false,
      danger: false,
    },
  }
);

export interface ActionIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionIconVariants> {
  asChild?: boolean;
  loading?: boolean;
  spin?: boolean;
  icon?: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  tooltipAlign?: "start" | "center" | "end";
  tooltipDelayDuration?: number;
}

const ActionIcon = React.forwardRef<HTMLButtonElement, ActionIconProps>(
  (
    {
      className,
      variant,
      size,
      active,
      glass,
      shadow,
      danger,
      asChild = false,
      loading = false,
      spin = false,
      icon,
      disabled,
      children,
      tooltip,
      tooltipSide = "top",
      tooltipAlign = "center",
      tooltipDelayDuration = 200,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    const iconSizeClass = {
      xs: "h-3 w-3",
      small: "h-3.5 w-3.5",
      default: "h-4 w-4",
      middle: "h-4 w-4",
      large: "h-5 w-5",
      lg: "h-5 w-5",
      xl: "h-6 w-6",
    };

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (loading || disabled) return;
        onClick?.(e);
      },
      [loading, disabled, onClick]
    );

    const resolvedIcon = loading ? (
      <Loader2
        className={cn(iconSizeClass[size ?? "default"], "animate-spin")}
        aria-hidden="true"
      />
    ) : spin && icon ? (
      React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
            className: cn(
              (icon as React.ReactElement<{ className?: string }>).props.className,
              "animate-spin"
            ),
          })
        : icon
    ) : (
      icon || children
    );

    const buttonEl = (
      <Comp
        className={cn(
          actionIconVariants({ variant, size, active, glass, shadow, danger }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        {...props}
      >
        {resolvedIcon}
      </Comp>
    );

    if (!tooltip) return buttonEl;

    return (
      <TooltipProvider delayDuration={tooltipDelayDuration}>
        <TooltipRoot>
          <TooltipTrigger asChild>{buttonEl}</TooltipTrigger>
          <TooltipContent side={tooltipSide} align={tooltipAlign}>
            {tooltip}
          </TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    );
  }
);

ActionIcon.displayName = "ActionIcon";

export { ActionIcon, actionIconVariants };
