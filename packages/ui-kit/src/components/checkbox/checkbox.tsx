"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Checkbox 变体样式
 */
const checkboxVariants = cva(
  [
    "peer shrink-0 rounded-sm border border-primary ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
    "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
  ],
  {
    variants: {
      /** 尺寸 */
      size: {
        sm: "h-3.5 w-3.5",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/**
 * Checkbox 组件属性
 */
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  /**
   * 标签文本
   */
  label?: string;
  /**
   * 描述文本
   */
  description?: string;
  /**
   * 是否为不确定状态
   */
  indeterminate?: boolean;
}

/**
 * Checkbox 复选框组件
 *
 * 用于在多个选项中选择一个或多个。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Checkbox />
 *
 * // 带标签
 * <Checkbox label="Accept terms and conditions" />
 *
 * // 带描述
 * <Checkbox
 *   label="Marketing emails"
 *   description="Receive emails about new products"
 * />
 *
 * // 不确定状态
 * <Checkbox indeterminate />
 * ```
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    { className, size, label, description, indeterminate, checked, ...props },
    ref
  ) => {
    const iconSize = {
      sm: "h-2.5 w-2.5",
      default: "h-3 w-3",
      lg: "h-3.5 w-3.5",
    };

    const checkboxElement = (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(checkboxVariants({ size }), className)}
        checked={indeterminate ? "indeterminate" : checked}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          {indeterminate ? (
            <Minus className={iconSize[size || "default"]} />
          ) : (
            <Check className={iconSize[size || "default"]} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (!label && !description) {
      return checkboxElement;
    }

    return (
      <div className="flex items-start space-x-3">
        <div className="pt-0.5">{checkboxElement}</div>
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
  }
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
