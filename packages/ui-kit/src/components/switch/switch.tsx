"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Switch 变体样式
 */
const switchVariants = cva(
  [
    "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  ],
  {
    variants: {
      /** 尺寸 */
      size: {
        sm: "h-4 w-7",
        default: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/**
 * SwitchThumb 变体样式
 */
const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
    "data-[state=unchecked]:translate-x-0",
  ],
  {
    variants: {
      /** 尺寸 */
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3",
        default: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/**
 * Switch 组件属性
 */
export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  /**
   * 标签文本
   */
  label?: string;
  /**
   * 描述文本
   */
  description?: string;
}

/**
 * Switch 开关组件
 *
 * 用于在两种状态之间切换。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Switch />
 *
 * // 带标签
 * <Switch label="Enable notifications" />
 *
 * // 带描述
 * <Switch
 *   label="Marketing emails"
 *   description="Receive emails about new products and features"
 * />
 * ```
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, label, description, ...props }, ref) => {
  const switchElement = (
    <SwitchPrimitives.Root
      className={cn(switchVariants({ size }), className)}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
    </SwitchPrimitives.Root>
  );

  if (!label && !description) {
    return switchElement;
  }

  return (
    <div className="flex items-center space-x-3">
      {switchElement}
      <div className="grid gap-1.5 leading-none">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, switchVariants, switchThumbVariants };
