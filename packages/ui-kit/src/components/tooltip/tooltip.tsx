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
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  showArrow?: boolean;
}

export interface TooltipProps {
  children: React.ReactNode;
  content?: React.ReactNode;
  title?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  disabled?: boolean;
  shortcut?: string | string[];
  showArrow?: boolean;
  maxWidth?: number | string;
  hotkey?: string[];
}

const formatHotkey = (keys: string[]): string[] =>
  keys.map((k) =>
    k
      .replace(/meta|cmd|command/i, "⌘")
      .replace(/shift/i, "⇧")
      .replace(/alt|option/i, "⌥")
      .replace(/ctrl|control/i, "⌃")
  );

const Tooltip = ({
  children,
  content,
  title,
  side = "top",
  align = "center",
  delayDuration = 200,
  disabled = false,
  shortcut,
  hotkey,
  showArrow = false,
  maxWidth = 240,
}: TooltipProps) => {
  const resolvedContent = content ?? title;

  if (disabled || !resolvedContent) {
    return <>{children}</>;
  }

  const hotkeyKeys = hotkey
    ? formatHotkey(hotkey)
    : shortcut
    ? formatHotkey(Array.isArray(shortcut) ? shortcut : shortcut.split("+"))
    : null;

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} showArrow={showArrow} style={{ maxWidth }}>
          <div className="flex items-center gap-2">
            <span className="flex-1">{resolvedContent}</span>
            {hotkeyKeys && (
              <span className="flex items-center gap-0.5 shrink-0">
                {hotkeyKeys.map((k, i) => (
                  <kbd
                    key={i}
                    className="inline-flex items-center justify-center rounded border border-border/40 bg-white/10 px-1 py-0.5 text-[10px] font-medium leading-none"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            )}
          </div>
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
