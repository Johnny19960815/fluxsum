"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * ActionIcon 变体样式定义
 */
const actionIconVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-md transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-95",
  ],
  {
    variants: {
      /** 变体样式 */
      variant: {
        /** 默认样式 */
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        /** 次要样式 */
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        /** 轮廓样式 */
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        /** 幽灵样式 */
        ghost: "hover:bg-accent hover:text-accent-foreground",
        /** 无边框样式 */
        borderless: "text-muted-foreground hover:text-foreground hover:bg-transparent",
        /** 危险样式 */
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        /** 填充样式 */
        filled: "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
      },
      /** 尺寸 */
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-14 w-14",
      },
      /** 是否激活 */
      active: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
      /** 是否有玻璃效果 */
      glass: {
        true: "bg-background/80 backdrop-blur-xl backdrop-saturate-150",
        false: "",
      },
      /** 是否有阴影 */
      shadow: {
        true: "shadow-md hover:shadow-lg",
        false: "",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
      active: false,
      glass: false,
      shadow: false,
    },
  }
);

/**
 * ActionIcon 组件属性
 */
export interface ActionIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionIconVariants> {
  /**
   * 是否作为子组件渲染
   */
  asChild?: boolean;
  /**
   * 是否显示加载状态
   */
  loading?: boolean;
  /**
   * 图标元素
   */
  icon?: React.ReactNode;
  /**
   * 工具提示文本
   */
  tooltip?: string;
}

/**
 * ActionIcon 图标按钮组件
 *
 * 一个紧凑的图标按钮，适用于工具栏、操作菜单等场景。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <ActionIcon icon={<SettingsIcon />} />
 *
 * // 带工具提示
 * <ActionIcon icon={<TrashIcon />} tooltip="Delete" variant="destructive" />
 *
 * // 加载状态
 * <ActionIcon icon={<SaveIcon />} loading />
 * ```
 */
const ActionIcon = React.forwardRef<HTMLButtonElement, ActionIconProps>(
  (
    {
      className,
      variant,
      size,
      active,
      glass,
      shadow,
      asChild = false,
      loading = false,
      icon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    const iconSize = {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      default: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
    };

    return (
      <Comp
        className={cn(
          actionIconVariants({ variant, size, active, glass, shadow }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <Loader2
            className={cn(iconSize[size || "default"], "animate-spin")}
            aria-hidden="true"
          />
        ) : (
          icon || children
        )}
      </Comp>
    );
  }
);

ActionIcon.displayName = "ActionIcon";

export { ActionIcon, actionIconVariants };
