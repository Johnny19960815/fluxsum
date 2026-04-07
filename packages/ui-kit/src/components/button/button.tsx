"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Button 变体样式定义
 * 支持多种视觉风格和尺寸
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      /** 按钮视觉风格 */
      variant: {
        /** 主要按钮 - 用于主要操作 */
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        /** 危险按钮 - 用于删除等危险操作 */
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        /** 轮廓按钮 - 次要操作 */
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        /** 次要按钮 */
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        /** 幽灵按钮 - 最低视觉权重 */
        ghost: "hover:bg-accent hover:text-accent-foreground",
        /** 链接样式 */
        link: "text-primary underline-offset-4 hover:underline",
        /** 成功按钮 */
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90",
        /** 警告按钮 */
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/90",
        /** 信息按钮 */
        info: "bg-info text-info-foreground shadow-sm hover:bg-info/90",
        /** 填充按钮 - 深色模式友好 */
        filled:
          "bg-foreground text-background shadow hover:bg-foreground/90",
      },
      /** 按钮尺寸 */
      size: {
        /** 默认尺寸 */
        default: "h-10 px-4 py-2",
        /** 小尺寸 */
        sm: "h-9 rounded-md px-3 text-xs",
        /** 大尺寸 */
        lg: "h-11 rounded-md px-8 text-base",
        /** 超大尺寸 */
        xl: "h-12 rounded-lg px-10 text-base",
        /** 图标按钮 */
        icon: "h-10 w-10",
        /** 小图标按钮 */
        "icon-sm": "h-8 w-8",
        /** 大图标按钮 */
        "icon-lg": "h-12 w-12",
      },
      /** 是否为块级按钮 */
      block: {
        true: "w-full",
        false: "",
      },
      /** 是否有玻璃效果 */
      glass: {
        true: "bg-background/80 backdrop-blur-xl backdrop-saturate-150",
        false: "",
      },
      /** 是否有阴影 */
      shadow: {
        true: "shadow-lg hover:shadow-xl",
        false: "",
      },
      /** 是否有闪光效果 */
      shine: {
        true: "shine",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      block: false,
      glass: false,
      shadow: false,
      shine: false,
    },
  }
);

/**
 * Button 组件属性
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * 是否作为子组件渲染（使用 Slot）
   * @default false
   */
  asChild?: boolean;
  /**
   * 是否显示加载状态
   * @default false
   */
  loading?: boolean;
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
 * Button 按钮组件
 *
 * 一个功能丰富的按钮组件，支持多种变体、尺寸和状态。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Button>Click me</Button>
 *
 * // 带图标
 * <Button leftIcon={<PlusIcon />}>Add Item</Button>
 *
 * // 加载状态
 * <Button loading>Submitting...</Button>
 *
 * // 不同变体
 * <Button variant="destructive">Delete</Button>
 * <Button variant="outline">Cancel</Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      block,
      glass,
      shadow,
      shine,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, block, glass, shadow, shine }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
