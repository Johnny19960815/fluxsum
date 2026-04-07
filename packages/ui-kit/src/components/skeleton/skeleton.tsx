"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Skeleton 变体样式定义
 */
const skeletonVariants = cva("animate-pulse bg-muted", {
  variants: {
    /** 形状 */
    shape: {
      default: "rounded-md",
      circle: "rounded-full",
      square: "rounded-none",
    },
  },
  defaultVariants: {
    shape: "default",
  },
});

/**
 * Skeleton 组件属性
 */
export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /**
   * 宽度
   */
  width?: string | number;
  /**
   * 高度
   */
  height?: string | number;
}

/**
 * Skeleton 骨架屏组件
 *
 * 用于在内容加载时显示占位符。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Skeleton className="h-4 w-[250px]" />
 *
 * // 圆形头像占位
 * <Skeleton shape="circle" className="h-12 w-12" />
 *
 * // 卡片骨架
 * <div className="space-y-2">
 *   <Skeleton className="h-4 w-full" />
 *   <Skeleton className="h-4 w-3/4" />
 * </div>
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ shape }), className)}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

/**
 * SkeletonText 文本骨架组件属性
 */
export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 行数
   */
  lines?: number;
  /**
   * 行间距
   */
  gap?: number;
}

/**
 * SkeletonText 文本骨架组件
 *
 * 用于展示多行文本的骨架屏。
 */
const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, gap = 8, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        style={{ gap: `${gap}px` }}
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-4"
            style={{
              width: index === lines - 1 ? "60%" : "100%",
            }}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = "SkeletonText";

/**
 * SkeletonAvatar 头像骨架组件属性
 */
export interface SkeletonAvatarProps extends SkeletonProps {
  /**
   * 尺寸
   */
  size?: "sm" | "default" | "lg" | "xl";
}

/**
 * SkeletonAvatar 头像骨架组件
 */
const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ className, size = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    };

    return (
      <Skeleton
        ref={ref}
        shape="circle"
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = "SkeletonAvatar";

/**
 * SkeletonCard 卡片骨架组件
 */
const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("rounded-lg border p-4 space-y-4", className)}
      {...props}
    >
      <div className="flex items-center space-x-4">
        <SkeletonAvatar />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
});

SkeletonCard.displayName = "SkeletonCard";

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  skeletonVariants,
};
