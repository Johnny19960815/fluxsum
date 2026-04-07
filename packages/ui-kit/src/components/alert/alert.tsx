"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Alert 变体样式定义
 */
const alertVariants = cva(
  [
    "relative w-full rounded-lg border p-4",
    "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px]",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  ],
  {
    variants: {
      /** 警告变体 */
      variant: {
        default: "bg-background text-foreground",
        info: "border-info/50 bg-info/10 text-info [&>svg]:text-info",
        success: "border-success/50 bg-success/10 text-success [&>svg]:text-success",
        warning: "border-warning/50 bg-warning/10 text-warning [&>svg]:text-warning",
        destructive: "border-destructive/50 bg-destructive/10 text-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Alert 组件属性
 */
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /**
   * 自定义图标
   */
  icon?: React.ReactNode;
  /**
   * 是否显示默认图标
   */
  showIcon?: boolean;
  /**
   * 是否可关闭
   */
  closable?: boolean;
  /**
   * 关闭回调
   */
  onClose?: () => void;
}

/**
 * Alert 警告提示组件
 *
 * 用于展示重要的提示信息。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>You can add components to your app.</AlertDescription>
 * </Alert>
 *
 * // 不同变体
 * <Alert variant="success">Operation successful!</Alert>
 * <Alert variant="destructive">Something went wrong.</Alert>
 * ```
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      icon,
      showIcon = true,
      closable = false,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);

    const defaultIcons = {
      default: <Info className="h-4 w-4" />,
      info: <Info className="h-4 w-4" />,
      success: <CheckCircle2 className="h-4 w-4" />,
      warning: <AlertCircle className="h-4 w-4" />,
      destructive: <XCircle className="h-4 w-4" />,
    };

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    if (!visible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {showIcon && (icon || defaultIcons[variant || "default"])}
        {children}
        {closable && (
          <button
            type="button"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={handleClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

/**
 * AlertTitle 组件属性
 */
export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * AlertTitle 警告标题组件
 */
const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
);
AlertTitle.displayName = "AlertTitle";

/**
 * AlertDescription 组件属性
 */
export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * AlertDescription 警告描述组件
 */
const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
