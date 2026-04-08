"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type FlexDirection = "vertical" | "vertical-reverse" | "horizontal" | "horizontal-reverse";

export type ContentPosition =
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "start"
  | "stretch"
  | "baseline";

export type CommonSpaceNumber = 2 | 4 | 8 | 12 | 16 | 24;

export interface FlexboxProps extends React.HTMLAttributes<HTMLElement> {
  align?: ContentPosition | React.CSSProperties["alignItems"];
  allowShrink?: boolean;
  as?: React.ElementType;
  direction?: FlexDirection;
  distribution?: React.CSSProperties["justifyContent"];
  flex?: number | string;
  gap?: CommonSpaceNumber | number | string;
  height?: number | string;
  horizontal?: boolean;
  justify?: React.CSSProperties["justifyContent"];
  padding?: string | number | CommonSpaceNumber;
  paddingBlock?: string | number;
  paddingInline?: string | number;
  visible?: boolean;
  width?: number | string;
  wrap?: React.CSSProperties["flexWrap"];
  ref?: React.Ref<HTMLElement>;
}

export type CenterProps = Omit<FlexboxProps, "distribution" | "direction" | "align">;

const getCssValue = (value: string | number | undefined): string | undefined => {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
};

const getFlexDirection = (
  direction?: FlexDirection,
  isHorizontal?: boolean
): React.CSSProperties["flexDirection"] => {
  if (isHorizontal) return "row";
  switch (direction) {
    case "horizontal":
      return "row";
    case "horizontal-reverse":
      return "row-reverse";
    case "vertical-reverse":
      return "column-reverse";
    case "vertical":
    default:
      return "column";
  }
};

const isSpaceDistribution = (distribution?: string) => {
  if (!distribution) return false;
  return ["space-between", "space-around", "space-evenly"].includes(distribution);
};

const isHorizontalDir = (direction?: FlexDirection, horizontal?: boolean) =>
  getFlexDirection(direction, horizontal) === "row";

const Flexbox = React.forwardRef<HTMLElement, FlexboxProps>(
  (
    {
      align,
      allowShrink,
      as: Component = "div",
      children,
      className,
      direction,
      distribution,
      flex,
      gap,
      height,
      horizontal,
      justify,
      padding,
      paddingBlock,
      paddingInline,
      style,
      visible = true,
      width,
      wrap,
      ...props
    },
    ref
  ) => {
    const justifyContent = justify || distribution;

    const calcWidth = (): string | undefined => {
      if (
        isHorizontalDir(direction, horizontal) &&
        !width &&
        isSpaceDistribution(justifyContent as string)
      )
        return "100%";
      return getCssValue(width);
    };

    const mergedStyle: React.CSSProperties = {
      display: visible === false ? "none" : "flex",
      flexDirection: direction || horizontal !== undefined ? getFlexDirection(direction, horizontal) : undefined,
      flexWrap: wrap,
      justifyContent: justifyContent,
      alignItems: align,
      flex: flex !== undefined ? String(flex) : undefined,
      width: calcWidth(),
      height: getCssValue(height),
      gap: getCssValue(gap),
      padding: getCssValue(padding),
      paddingBlock: getCssValue(paddingBlock),
      paddingInline: getCssValue(paddingInline),
      minWidth: allowShrink ? 0 : undefined,
      ...style,
    };

    // Remove undefined values
    Object.keys(mergedStyle).forEach(
      (key) => mergedStyle[key as keyof React.CSSProperties] === undefined && delete mergedStyle[key as keyof React.CSSProperties]
    );

    return (
      <Component ref={ref} className={cn("flex", className)} style={mergedStyle} {...props}>
        {children}
      </Component>
    );
  }
);

Flexbox.displayName = "Flexbox";

const Center = React.forwardRef<HTMLElement, CenterProps>(
  ({ children, className, ...props }, ref) => (
    <Flexbox
      ref={ref}
      align="center"
      justify="center"
      className={className}
      {...props}
    >
      {children}
    </Flexbox>
  )
);

Center.displayName = "Center";

export { Flexbox, Center };
