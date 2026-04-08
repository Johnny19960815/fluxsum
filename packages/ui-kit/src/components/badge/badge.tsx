"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Badge 变体样式定义
 */
const badgeVariants = cva(
  [
    "inline-flex items-center rounded-full border px-2.5 py-0.5",
    "text-xs font-semibold transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ],
  {
    variants: {
      /** 徽章变体 */
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        info: "border-transparent bg-info text-info-foreground",
        outline: "text-foreground",
      },
      /** 徽章尺寸 */
      size: {
        sm: "px-2 py-0 text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      /** 是否为圆点样式 */
      dot: {
        true: "h-2 w-2 p-0 rounded-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      dot: false,
    },
  }
);

/**
 * Badge 组件属性
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * 左侧图标
   */
  leftIcon?: React.ReactNode;
  /**
   * 右侧图标
   */
  rightIcon?: React.ReactNode;
}

/**
 * Badge 徽章组件
 *
 * 用于展示状态、标签或计数。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Badge>New</Badge>
 *
 * // 不同变体
 * <Badge variant="success">Active</Badge>
 * <Badge variant="destructive">Error</Badge>
 *
 * // 带图标
 * <Badge leftIcon={<CheckIcon />}>Verified</Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    { className, variant, size, dot, leftIcon, rightIcon, children, ...props },
    ref
  ) => {
    if (dot) {
      return (
        <div
          ref={ref}
          className={cn(badgeVariants({ variant, dot }), className)}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {leftIcon && <span className="mr-1 -ml-0.5">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1 -mr-0.5">{rightIcon}</span>}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export interface BadgeWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number | React.ReactNode;
  dot?: boolean;
  overflowCount?: number;
  showZero?: boolean;
  variant?: VariantProps<typeof badgeVariants>["variant"];
  size?: VariantProps<typeof badgeVariants>["size"];
  offset?: [number, number];
  children: React.ReactNode;
}

const BadgeWrapper = React.forwardRef<HTMLDivElement, BadgeWrapperProps>(
  (
    {
      className,
      count,
      dot = false,
      overflowCount = 99,
      showZero = false,
      variant = "destructive",
      size = "sm",
      offset = [0, 0],
      children,
      ...props
    },
    ref
  ) => {
    const numericCount = typeof count === "number" ? count : undefined;
    const displayCount =
      numericCount !== undefined && numericCount > overflowCount
        ? `${overflowCount}+`
        : count;

    const isHidden =
      !dot &&
      numericCount !== undefined &&
      numericCount <= 0 &&
      !showZero;

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        {...props}
      >
        {children}
        {!isHidden && (
          <span
            className={cn(
              "absolute pointer-events-none",
              dot
                ? cn(badgeVariants({ variant, dot: true }))
                : cn(badgeVariants({ variant, size })),
              "z-10",
              dot
                ? "-top-0.5 -right-0.5"
                : "top-0 right-0 translate-x-1/2 -translate-y-1/2"
            )}
            style={{
              marginTop: offset[1] ?? 0,
              marginRight: -(offset[0] ?? 0),
            }}
          >
            {!dot && displayCount}
          </span>
        )}
      </div>
    );
  }
);

BadgeWrapper.displayName = "BadgeWrapper";

export { Badge, BadgeWrapper, badgeVariants };
