"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const tagVariants = cva(
  [
    "inline-flex items-center gap-1 font-medium transition-colors",
    "border select-none",
  ],
  {
    variants: {
      variant: {
        filled: "bg-muted/60 border-muted text-foreground",
        outlined: "bg-transparent border-border text-foreground",
        borderless: "bg-transparent border-transparent text-foreground",
      },
      size: {
        sm: "h-5 px-1.5 text-[11px] rounded",
        middle: "h-6 px-2 text-xs rounded-md",
        large: "h-7 px-2.5 text-sm rounded-md",
      },
      clickable: {
        true: "cursor-pointer hover:opacity-80 active:opacity-60",
        false: "",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "middle",
      clickable: false,
    },
  }
);

const colorPresets: Record<
  string,
  { text: string; bg: string; border: string }
> = {
  red: {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
  },
  orange: {
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-800",
  },
  yellow: {
    text: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/40",
    border: "border-yellow-200 dark:border-yellow-800",
  },
  green: {
    text: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/40",
    border: "border-green-200 dark:border-green-800",
  },
  cyan: {
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    border: "border-cyan-200 dark:border-cyan-800",
  },
  blue: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
  },
  purple: {
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    border: "border-purple-200 dark:border-purple-800",
  },
  pink: {
    text: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950/40",
    border: "border-pink-200 dark:border-pink-800",
  },
  success: {
    text: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  warning: {
    text: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
  },
  error: {
    text: "text-red-700 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
  },
  info: {
    text: "text-sky-700 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-950/40",
    border: "border-sky-200 dark:border-sky-800",
  },
};

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof tagVariants> {
  color?: string;
  icon?: React.ReactNode;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bordered?: boolean;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant = "filled",
      size = "middle",
      color,
      icon,
      closable = false,
      closeIcon,
      onClose,
      bordered = true,
      onClick,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const preset = color ? colorPresets[color] : null;
    const isHexColor = color?.startsWith("#");

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClose?.(e);
    };

    const inlineStyle: React.CSSProperties = isHexColor
      ? {
          color: "#fff",
          backgroundColor:
            variant === "borderless" ? "transparent" : color,
          borderColor:
            variant === "borderless" ? "transparent" : `${color}44`,
          ...style,
        }
      : (style ?? {});

    return (
      <span
        ref={ref}
        className={cn(
          tagVariants({
            variant: bordered ? variant : "borderless",
            size,
            clickable: !!onClick,
          }),
          preset && variant !== "borderless" && preset.bg,
          preset && variant !== "borderless" && preset.border,
          preset && preset.text,
          !bordered && "border-transparent",
          className
        )}
        style={inlineStyle}
        onClick={onClick}
        {...props}
      >
        {icon && (
          <span className="inline-flex items-center leading-none">{icon}</span>
        )}
        {children}
        {closable && (
          <button
            type="button"
            aria-label="Close tag"
            onClick={handleClose}
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              "opacity-60 hover:opacity-100 transition-opacity",
              "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              size === "sm" && "h-3 w-3",
              size === "middle" && "h-3.5 w-3.5",
              size === "large" && "h-4 w-4"
            )}
          >
            {closeIcon ?? (
              <X
                className={cn(
                  size === "sm" && "h-2.5 w-2.5",
                  size === "middle" && "h-3 w-3",
                  size === "large" && "h-3.5 w-3.5"
                )}
              />
            )}
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag, tagVariants };
