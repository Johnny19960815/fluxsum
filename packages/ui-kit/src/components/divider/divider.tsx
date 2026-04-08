"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const dividerVariants = cva("shrink-0", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
    variant: {
      solid: "",
      dashed: "",
      dotted: "",
    },
    size: {
      thin: "",
      default: "",
      thick: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
    size: "default",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
  dashed?: boolean;
  plain?: boolean;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "solid",
      size = "default",
      children,
      align = "center",
      dashed = false,
      plain = false,
      style,
      ...props
    },
    ref
  ) => {
    const resolvedVariant = dashed ? "dashed" : variant;

    const borderStyle =
      resolvedVariant === "dashed"
        ? "dashed"
        : resolvedVariant === "dotted"
        ? "dotted"
        : "solid";

    const borderWidth =
      size === "thin" ? 1 : size === "thick" ? 2 : 1;

    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            "inline-block self-stretch mx-2",
            "border-l border-border",
            className
          )}
          style={{
            borderLeftStyle: borderStyle,
            borderLeftWidth: borderWidth,
            ...style,
          }}
          {...props}
        />
      );
    }

    if (children) {
      const alignClass =
        align === "left"
          ? "justify-start"
          : align === "right"
          ? "justify-end"
          : "justify-center";

      const leftFlex = align === "left" ? "flex-none w-4" : "flex-1";
      const rightFlex = align === "right" ? "flex-none w-4" : "flex-1";

      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn("flex items-center gap-3 w-full my-3", className)}
          style={style}
          {...props}
        >
          <div
            className={cn("border-t border-border", leftFlex)}
            style={{ borderTopStyle: borderStyle, borderTopWidth: borderWidth }}
          />
          <span
            className={cn(
              "shrink-0 text-sm",
              plain ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {children}
          </span>
          <div
            className={cn("border-t border-border", rightFlex)}
            style={{ borderTopStyle: borderStyle, borderTopWidth: borderWidth }}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn("w-full border-t border-border my-3", className)}
        style={{
          borderTopStyle: borderStyle,
          borderTopWidth: borderWidth,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
