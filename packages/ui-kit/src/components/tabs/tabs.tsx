"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const Tabs = TabsPrimitive.Root;

/**
 * TabsList 变体样式
 */
const tabsListVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "h-10 rounded-md bg-muted p-1 text-muted-foreground",
        line: "border-b border-border bg-transparent p-0",
        pills: "gap-2 bg-transparent p-0",
        segment: "h-10 rounded-lg bg-muted p-1",
        card: "gap-0 bg-transparent p-0 border-b border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * TabsTrigger 变体样式
 */
const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium",
    "ring-offset-background transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "rounded-sm",
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        ],
        line: [
          "border-b-2 border-transparent rounded-none pb-3",
          "data-[state=active]:border-primary data-[state=active]:text-foreground",
        ],
        pills: [
          "rounded-full",
          "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
        ],
        segment: [
          "rounded-md",
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        ],
        card: [
          "rounded-none border border-b-0 border-transparent -mb-px px-4 py-2",
          "data-[state=active]:bg-background data-[state=active]:border-border data-[state=active]:text-foreground",
          "data-[state=active]:rounded-t-md",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * TabsList 组件属性
 */
export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

/**
 * TabsList 组件
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * TabsTrigger 组件属性
 */
export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  /**
   * 左侧图标
   */
  leftIcon?: React.ReactNode;
  /**
   * 右侧图标或徽章
   */
  rightIcon?: React.ReactNode;
}

/**
 * TabsTrigger 组件
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, leftIcon, rightIcon, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  >
    {leftIcon && <span className="mr-2">{leftIcon}</span>}
    {children}
    {rightIcon && <span className="ml-2">{rightIcon}</span>}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * TabsContent 组件
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};
