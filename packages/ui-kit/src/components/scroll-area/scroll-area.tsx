"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../lib/utils";

/**
 * ScrollBar 滚动条子组件
 */
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

/**
 * ScrollArea 组件属性
 */
export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /**
   * 是否显示垂直滚动条
   */
  vertical?: boolean;
  /**
   * 是否显示水平滚动条
   */
  horizontal?: boolean;
  /**
   * 视口的最大高度
   */
  maxHeight?: string | number;
}

/**
 * ScrollArea 自定义滚动区域组件
 *
 * 提供跨浏览器一致的自定义样式滚动条。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <ScrollArea className="h-72 w-48 rounded-md border">
 *   {Array.from({ length: 50 }, (_, i) => (
 *     <div key={i} className="p-2">Item {i + 1}</div>
 *   ))}
 * </ScrollArea>
 *
 * // 水平滚动
 * <ScrollArea horizontal>
 *   <div className="flex gap-4 p-4">
 *     {items.map(item => <Card key={item.id}>{item.title}</Card>)}
 *   </div>
 * </ScrollArea>
 * ```
 */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(
  (
    {
      className,
      children,
      vertical = true,
      horizontal = false,
      maxHeight,
      style,
      ...props
    },
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{
        maxHeight:
          maxHeight !== undefined
            ? typeof maxHeight === "number"
              ? `${maxHeight}px`
              : maxHeight
            : undefined,
        ...style,
      }}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      {vertical && <ScrollBar orientation="vertical" />}
      {horizontal && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export { ScrollArea, ScrollBar };
