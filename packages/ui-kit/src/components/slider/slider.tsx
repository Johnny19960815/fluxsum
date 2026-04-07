"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

/**
 * Slider 组件属性
 */
export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /**
   * 是否显示当前值标签
   */
  showValue?: boolean;
  /**
   * 自定义值格式化函数
   */
  formatValue?: (value: number) => string;
}

/**
 * Slider 滑块组件
 *
 * 允许用户在一个范围内选择数值。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Slider defaultValue={[50]} max={100} step={1} />
 *
 * // 显示数值标签
 * <Slider defaultValue={[30]} max={100} showValue />
 *
 * // 范围选择
 * <Slider defaultValue={[20, 80]} max={100} />
 *
 * // 自定义格式
 * <Slider
 *   defaultValue={[500]}
 *   max={1000}
 *   showValue
 *   formatValue={(v) => `$${v}`}
 * />
 * ```
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showValue, formatValue, ...props }, ref) => {
  const values = (props.value ?? props.defaultValue ?? [0]) as number[];

  const format = formatValue ?? ((v: number) => String(v));

  return (
    <div className="w-full space-y-2">
      {showValue && (
        <div className="flex justify-between">
          {values.map((v, i) => (
            <span
              key={i}
              className="text-xs font-medium tabular-nums text-foreground"
            >
              {format(v)}
            </span>
          ))}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {values.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
