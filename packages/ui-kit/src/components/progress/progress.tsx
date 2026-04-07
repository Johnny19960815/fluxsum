"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Progress 轨道变体
 */
const progressTrackVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      /** 尺寸 */
      size: {
        xs: "h-1",
        sm: "h-2",
        default: "h-3",
        lg: "h-4",
        xl: "h-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/**
 * Progress 填充条变体
 */
const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-500 ease-in-out rounded-full",
  {
    variants: {
      /** 颜色变体 */
      variant: {
        default: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
        info: "bg-info",
        rainbow:
          "bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500",
      },
      /** 是否有动画条纹 */
      animated: {
        true: "animate-progress-stripes bg-[length:1rem_1rem]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animated: false,
    },
  }
);

/**
 * Progress 组件属性
 */
export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  /**
   * 当前进度值 (0-100)
   * @default 0
   */
  value?: number;
  /**
   * 是否显示进度文字标签
   */
  showLabel?: boolean;
  /**
   * 自定义标签（默认显示百分比）
   */
  label?: string;
  /**
   * 是否为不确定进度（加载中）
   */
  indeterminate?: boolean;
}

/**
 * Progress 进度条组件
 *
 * 用于展示任务进度或操作完成情况。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Progress value={60} />
 *
 * // 带标签
 * <Progress value={75} showLabel />
 *
 * // 不确定进度
 * <Progress indeterminate />
 *
 * // 不同颜色
 * <Progress value={50} variant="success" />
 * <Progress value={30} variant="warning" />
 * ```
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      size,
      variant,
      animated,
      showLabel,
      label,
      indeterminate,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const displayLabel = label ?? `${clampedValue}%`;

    return (
      <div className="w-full space-y-1.5">
        {showLabel && (
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-medium tabular-nums">{displayLabel}</span>
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            progressTrackVariants({ size }),
            indeterminate && "overflow-hidden",
            className
          )}
          value={indeterminate ? undefined : clampedValue}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              progressIndicatorVariants({ variant, animated }),
              indeterminate && "animate-indeterminate-progress"
            )}
            style={
              indeterminate
                ? undefined
                : { transform: `translateX(-${100 - clampedValue}%)` }
            }
          />
        </ProgressPrimitive.Root>
      </div>
    );
  }
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressTrackVariants, progressIndicatorVariants };
