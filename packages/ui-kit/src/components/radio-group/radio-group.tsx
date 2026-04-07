"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "../../lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/**
 * RadioGroupItem 单选项组件属性
 */
export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
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
 * RadioGroupItem 单选项组件
 *
 * @example
 * ```tsx
 * <RadioGroup defaultValue="option-1">
 *   <RadioGroupItem value="option-1" label="Option 1" />
 *   <RadioGroupItem value="option-2" label="Option 2" />
 * </RadioGroup>
 * ```
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, description, id, ...props }, ref) => {
  const itemId = id ?? `radio-${props.value}`;

  const radioButton = (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={itemId}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary",
        "ring-offset-background",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );

  if (!label && !description) {
    return radioButton;
  }

  return (
    <div className="flex items-start space-x-3">
      <div className="pt-0.5">{radioButton}</div>
      <div className="grid gap-1 leading-none">
        {label && (
          <label
            htmlFor={itemId}
            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
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
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
