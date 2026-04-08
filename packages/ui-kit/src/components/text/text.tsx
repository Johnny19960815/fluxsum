"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const textVariants = cva("", {
  variants: {
    type: {
      default: "text-foreground",
      secondary: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      danger: "text-destructive",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
    weight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    italic: { true: "italic", false: "" },
    underline: { true: "underline underline-offset-2", false: "" },
    mark: { true: "bg-yellow-200 dark:bg-yellow-900 px-0.5 rounded", false: "" },
    code: {
      true: "font-mono bg-muted px-1.5 py-0.5 rounded text-[0.875em] border border-border",
      false: "",
    },
    disabled: { true: "opacity-50 cursor-not-allowed select-none", false: "" },
    delete: { true: "line-through", false: "" },
    ellipsis: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    type: "default",
    italic: false,
    underline: false,
    mark: false,
    code: false,
    disabled: false,
    delete: false,
    ellipsis: false,
  },
});

type TextAs =
  | "div"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "strong"
  | "em"
  | "small";

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: TextAs;
  color?: string;
  noWrap?: boolean;
  lineClamp?: number;
  lineHeight?: string | number;
  fontSize?: string | number;
  textAlign?: React.CSSProperties["textAlign"];
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Tag = "span",
      className,
      type,
      size,
      weight,
      italic,
      underline,
      mark,
      code,
      disabled,
      delete: deleteStyle,
      ellipsis,
      color,
      noWrap,
      lineClamp,
      lineHeight,
      fontSize,
      textAlign,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const inlineStyle: React.CSSProperties = {
      ...(color && { color }),
      ...(lineHeight && { lineHeight }),
      ...(fontSize && { fontSize }),
      ...(textAlign && { textAlign }),
      ...(noWrap && { whiteSpace: "nowrap" }),
      ...(lineClamp != null && {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lineClamp,
        overflow: "hidden",
      }),
      ...style,
    };

    return (
      <Tag
        ref={ref as any}
        className={cn(
          textVariants({
            type,
            size,
            weight,
            italic,
            underline,
            mark,
            code,
            disabled,
            delete: deleteStyle,
            ellipsis: ellipsis && !lineClamp ? true : false,
          }),
          className
        )}
        style={Object.keys(inlineStyle).length ? inlineStyle : undefined}
        {...(props as any)}
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };
