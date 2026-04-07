"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Avatar 变体样式定义
 */
const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden",
  {
    variants: {
      /** 头像形状 */
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
      /** 头像尺寸 */
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        default: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-20 w-20 text-xl",
      },
      /** 是否有边框 */
      bordered: {
        true: "ring-2 ring-background ring-offset-2 ring-offset-border",
        false: "",
      },
    },
    defaultVariants: {
      shape: "circle",
      size: "default",
      bordered: false,
    },
  }
);

/**
 * Avatar 组件属性
 */
export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  /**
   * 图片地址
   */
  src?: string;
  /**
   * 图片描述
   */
  alt?: string;
  /**
   * 后备文本（当图片加载失败时显示）
   */
  fallback?: string;
  /**
   * 后备背景色
   */
  fallbackColor?: string;
  /**
   * 在线状态
   */
  status?: "online" | "offline" | "busy" | "away";
}

/**
 * Avatar 头像组件
 *
 * 用于展示用户头像，支持图片、文字后备和在线状态。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Avatar src="/avatar.jpg" alt="User" />
 *
 * // 带后备文字
 * <Avatar fallback="JD" />
 *
 * // 带在线状态
 * <Avatar src="/avatar.jpg" status="online" />
 * ```
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      shape,
      size,
      bordered,
      src,
      alt,
      fallback,
      fallbackColor,
      status,
      ...props
    },
    ref
  ) => {
    const statusColors = {
      online: "bg-success",
      offline: "bg-muted-foreground",
      busy: "bg-destructive",
      away: "bg-warning",
    };

    return (
      <div className="relative inline-block">
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(avatarVariants({ shape, size, bordered }), className)}
          {...props}
        >
          <AvatarPrimitive.Image
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
          />
          <AvatarPrimitive.Fallback
            className={cn(
              "flex h-full w-full items-center justify-center bg-muted font-medium text-muted-foreground",
              shape === "circle" ? "rounded-full" : "rounded-md"
            )}
            style={fallbackColor ? { backgroundColor: fallbackColor } : undefined}
          >
            {fallback}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
              statusColors[status],
              size === "xs" && "h-1.5 w-1.5",
              size === "sm" && "h-2 w-2",
              size === "default" && "h-2.5 w-2.5",
              size === "lg" && "h-3 w-3",
              size === "xl" && "h-3.5 w-3.5",
              size === "2xl" && "h-4 w-4"
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

/**
 * AvatarGroup 组件属性
 */
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 最大显示数量
   */
  max?: number;
  /**
   * 头像尺寸
   */
  size?: VariantProps<typeof avatarVariants>["size"];
  /**
   * 子元素（Avatar 组件）
   */
  children: React.ReactNode;
}

/**
 * AvatarGroup 头像组组件
 *
 * 用于展示一组头像，支持限制显示数量。
 */
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, size = "default", children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max ? childrenArray.length - max : 0;

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-2", className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="relative" style={{ zIndex: visibleChildren.length - index }}>
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                  size,
                  bordered: true,
                })
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={cn(
              avatarVariants({ size, shape: "circle", bordered: true }),
              "flex items-center justify-center bg-muted text-muted-foreground font-medium"
            )}
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, avatarVariants };
