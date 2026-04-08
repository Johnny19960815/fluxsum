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

// ─── ProgressCircle ───────────────────────────────────────────────────────────

export interface ProgressCircleProps extends React.SVGAttributes<SVGSVGElement> {
  value?: number;
  size?: number;
  strokeWidth?: number;
  variant?: VariantProps<typeof progressIndicatorVariants>["variant"];
  showLabel?: boolean;
  label?: React.ReactNode;
  indeterminate?: boolean;
}

const variantColorMap: Record<string, string> = {
  default: "hsl(var(--primary))",
  success: "hsl(var(--success, 142 71% 45%))",
  warning: "hsl(var(--warning, 38 92% 50%))",
  destructive: "hsl(var(--destructive))",
  info: "hsl(var(--info, 199 89% 48%))",
  rainbow: "url(#progress-circle-gradient)",
};

const ProgressCircle = React.forwardRef<SVGSVGElement, ProgressCircleProps>(
  (
    {
      value = 0,
      size = 64,
      strokeWidth = 6,
      variant = "default",
      showLabel = true,
      label,
      indeterminate = false,
      className,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;
    const strokeColor = variantColorMap[variant ?? "default"] ?? variantColorMap.default;
    const displayLabel = label ?? `${clampedValue}%`;

    return (
      <div
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
      >
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          className={cn(indeterminate && "animate-spin")}
          {...props}
        >
          {variant === "rainbow" && (
            <defs>
              <linearGradient id="progress-circle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(270 76% 60%)" />
                <stop offset="50%" stopColor="hsl(220 80% 60%)" />
                <stop offset="100%" stopColor="hsl(190 80% 55%)" />
              </linearGradient>
            </defs>
          )}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--secondary))"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? circumference * 0.75 : strokeDashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        {showLabel && !indeterminate && (
          <span
            className="absolute text-center font-medium tabular-nums leading-none"
            style={{ fontSize: Math.max(size * 0.2, 10) }}
          >
            {displayLabel}
          </span>
        )}
      </div>
    );
  }
);

ProgressCircle.displayName = "ProgressCircle";

// ─── ProgressSteps ────────────────────────────────────────────────────────────

export interface ProgressStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  steps?: number;
  variant?: VariantProps<typeof progressIndicatorVariants>["variant"];
  size?: "sm" | "default" | "lg";
  gap?: number;
}

const stepVariantColorMap: Record<string, string> = {
  default: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  info: "bg-info",
  rainbow: "bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500",
};

const ProgressSteps = React.forwardRef<HTMLDivElement, ProgressStepsProps>(
  (
    {
      value = 0,
      steps = 5,
      variant = "default",
      size = "default",
      gap = 4,
      className,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const filledSteps = Math.round((clampedValue / 100) * steps);

    const stepHeight = size === "sm" ? "h-1" : size === "lg" ? "h-3" : "h-2";
    const activeColor = stepVariantColorMap[variant ?? "default"] ?? "bg-primary";

    return (
      <div
        ref={ref}
        className={cn("flex w-full", className)}
        style={{ gap }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        {Array.from({ length: steps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-full transition-all duration-300",
              stepHeight,
              i < filledSteps ? activeColor : "bg-secondary"
            )}
          />
        ))}
      </div>
    );
  }
);

ProgressSteps.displayName = "ProgressSteps";

export { Progress, ProgressCircle, ProgressSteps, progressTrackVariants, progressIndicatorVariants };
