"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Card 变体样式定义
 */
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground",
  {
    variants: {
      /** 卡片变体 */
      variant: {
        default: "border-border",
        outline: "border-2",
        ghost: "border-transparent bg-transparent",
        filled: "border-transparent bg-muted",
      },
      /** 是否有阴影 */
      shadow: {
        none: "",
        sm: "shadow-sm",
        default: "shadow",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      /** 是否可悬停 */
      hoverable: {
        true: "transition-all duration-200 hover:shadow-md hover:border-primary/50 cursor-pointer",
        false: "",
      },
      /** 是否有玻璃效果 */
      glass: {
        true: "bg-card/80 backdrop-blur-xl backdrop-saturate-150",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      shadow: "sm",
      hoverable: false,
      glass: false,
    },
  }
);

/**
 * Card 组件属性
 */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card 卡片组件
 *
 * 用于展示内容的容器组件。
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, shadow, hoverable, glass, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, shadow, hoverable, glass }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

/**
 * CardHeader 组件属性
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardHeader 卡片头部组件
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/**
 * CardTitle 组件属性
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * CardTitle 卡片标题组件
 */
const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

/**
 * CardDescription 组件属性
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * CardDescription 卡片描述组件
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

/**
 * CardContent 组件属性
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardContent 卡片内容组件
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

/**
 * CardFooter 组件属性
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * CardFooter 卡片底部组件
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
