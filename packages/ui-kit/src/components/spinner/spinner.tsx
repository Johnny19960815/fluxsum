"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Spinner 变体样式
 */
const spinnerVariants = cva("animate-spin", {
  variants: {
    /** 尺寸 */
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-10 w-10",
    },
    /** 颜色变体 */
    variant: {
      default: "text-primary",
      secondary: "text-secondary-foreground",
      muted: "text-muted-foreground",
      white: "text-white",
      destructive: "text-destructive",
      success: "text-success",
      warning: "text-warning",
      info: "text-info",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

/**
 * Spinner 组件属性
 */
export interface SpinnerProps
  extends React.HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * 无障碍标签
   */
  label?: string;
}

/**
 * Spinner 加载指示器组件
 *
 * 轻量级的旋转加载动画，适合内联使用。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Spinner />
 *
 * // 不同尺寸
 * <Spinner size="sm" />
 * <Spinner size="lg" />
 *
 * // 不同颜色
 * <Spinner variant="muted" />
 *
 * // 带文字
 * <div className="flex items-center gap-2">
 *   <Spinner size="sm" />
 *   <span>Loading...</span>
 * </div>
 * ```
 */
const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, variant, label = "Loading...", ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={cn(spinnerVariants({ size, variant }), className)}
        aria-label={label}
        role="status"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  }
);

Spinner.displayName = "Spinner";

/**
 * SpinnerOverlay 全屏加载遮罩属性
 */
export interface SpinnerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 加载提示文字
   */
  tip?: string;
  /**
   * Spinner 尺寸
   */
  size?: VariantProps<typeof spinnerVariants>["size"];
}

/**
 * SpinnerOverlay 全屏加载遮罩组件
 */
const SpinnerOverlay = React.forwardRef<HTMLDivElement, SpinnerOverlayProps>(
  ({ className, visible = true, tip, size = "lg", ...props }, ref) => {
    if (!visible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-center gap-3",
          "bg-background/80 backdrop-blur-sm",
          className
        )}
        aria-live="polite"
        aria-busy={visible}
        {...props}
      >
        <Spinner size={size} />
        {tip && (
          <p className="text-sm text-muted-foreground animate-pulse">{tip}</p>
        )}
      </div>
    );
  }
);

SpinnerOverlay.displayName = "SpinnerOverlay";

export { Spinner, SpinnerOverlay, spinnerVariants };
