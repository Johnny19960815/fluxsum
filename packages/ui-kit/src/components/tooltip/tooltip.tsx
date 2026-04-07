"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";

/**
 * TooltipProvider 组件
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Tooltip 组件
 */
const TooltipRoot = TooltipPrimitive.Root;

/**
 * TooltipTrigger 组件
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * TooltipContent 组件属性
 */
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

/**
 * TooltipContent 组件
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/**
 * Tooltip 简化组件属性
 */
export interface TooltipProps {
  /**
   * 触发元素
   */
  children: React.ReactNode;
  /**
   * 提示内容
   */
  content: React.ReactNode;
  /**
   * 提示位置
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * 对齐方式
   */
  align?: "start" | "center" | "end";
  /**
   * 延迟显示时间（毫秒）
   */
  delayDuration?: number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
}

/**
 * Tooltip 简化组件
 *
 * 一个简化的 Tooltip 组件，封装了常用功能。
 *
 * @example
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 */
const Tooltip = ({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 200,
  disabled = false,
}: TooltipProps) => {
  if (disabled || !content) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
};
