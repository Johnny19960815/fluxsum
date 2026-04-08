"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Alert 变体样式定义
 */
export type AlertType = "info" | "success" | "warning" | "error";

const alertTypeMap: Record<AlertType, string> = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "destructive",
};

const alertVariants = cva(
  ["relative w-full rounded-lg border p-4 text-sm transition-all"],
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        info: "border-info/50 bg-info/10 text-foreground [&_.alert-icon]:text-info",
        success: "border-success/50 bg-success/10 text-foreground [&_.alert-icon]:text-success",
        warning: "border-warning/50 bg-warning/10 text-foreground [&_.alert-icon]:text-warning",
        destructive: "border-destructive/50 bg-destructive/10 text-foreground [&_.alert-icon]:text-destructive",
      },
      filled: {
        true: "",
        false: "",
      },
      glass: {
        true: "backdrop-blur-xl bg-background/60 border-border/50",
        false: "",
      },
      colorfulText: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "info", filled: true, class: "bg-info text-info-foreground border-info" },
      { variant: "success", filled: true, class: "bg-success text-success-foreground border-success" },
      { variant: "warning", filled: true, class: "bg-warning text-warning-foreground border-warning" },
      { variant: "destructive", filled: true, class: "bg-destructive text-destructive-foreground border-destructive" },
      { variant: "info", colorfulText: true, class: "text-info" },
      { variant: "success", colorfulText: true, class: "text-success" },
      { variant: "warning", colorfulText: true, class: "text-warning" },
      { variant: "destructive", colorfulText: true, class: "text-destructive" },
    ],
    defaultVariants: {
      variant: "default",
      filled: false,
      glass: false,
      colorfulText: false,
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  type?: AlertType;
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  extra?: React.ReactNode;
  message?: React.ReactNode;
  description?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      type,
      filled,
      glass,
      colorfulText,
      icon,
      showIcon = true,
      closable = false,
      onClose,
      extra,
      message,
      description,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);

    const resolvedVariant = type
      ? (alertTypeMap[type] as typeof variant)
      : (variant ?? "default");

    const defaultIcons: Record<string, React.ReactNode> = {
      default: <Info className="h-4 w-4 alert-icon" />,
      info: <Info className="h-4 w-4 alert-icon" />,
      success: <CheckCircle2 className="h-4 w-4 alert-icon" />,
      warning: <AlertCircle className="h-4 w-4 alert-icon" />,
      destructive: <XCircle className="h-4 w-4 alert-icon" />,
    };

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    if (!visible) return null;

    const hasStructured = message !== undefined || description !== undefined;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ variant: resolvedVariant, filled, glass, colorfulText }),
          className
        )}
        {...props}
      >
        <div className="flex gap-3">
          {showIcon && (
            <span className="mt-0.5 shrink-0 alert-icon">
              {icon ?? defaultIcons[resolvedVariant as string ?? "default"]}
            </span>
          )}
          <div className="flex-1 min-w-0">
            {hasStructured ? (
              <>
                {message && (
                  <div className="font-medium leading-none mb-1">{message}</div>
                )}
                {description && (
                  <div className="text-sm opacity-90 mt-1">{description}</div>
                )}
              </>
            ) : (
              children
            )}
          </div>
          {(extra || closable) && (
            <div className="flex items-start gap-1 shrink-0">
              {extra}
              {closable && (
                <button
                  type="button"
                  className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
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
