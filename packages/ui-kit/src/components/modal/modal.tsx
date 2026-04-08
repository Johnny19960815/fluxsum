"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

/**
 * DialogOverlay 遮罩层组件
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * DialogContent 变体样式
 */
const dialogContentVariants = cva(
  [
    "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%]",
    "gap-4 border bg-background p-6 shadow-lg duration-200",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
    "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
  ],
  {
    variants: {
      size: {
        sm: "max-w-sm rounded-lg",
        default: "max-w-lg rounded-lg",
        lg: "max-w-2xl rounded-lg",
        xl: "max-w-4xl rounded-lg",
        full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] rounded-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/**
 * DialogContent 组件属性
 */
export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  /**
   * 是否显示关闭按钮
   */
  showClose?: boolean;
}

/**
 * DialogContent 内容组件
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, size, showClose = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogContentVariants({ size }), className)}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * DialogHeader 头部组件
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

/**
 * DialogFooter 底部组件
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

/**
 * DialogTitle 标题组件
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * DialogDescription 描述组件
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/**
 * Modal 简化组件属性
 */
export interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  size?: VariantProps<typeof dialogContentVariants>["size"];
  width?: number | string;
  showClose?: boolean;
  fullscreen?: boolean;
  centered?: boolean;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  okLoading?: boolean;
  okDisabled?: boolean;
  noFooter?: boolean;
  classNames?: {
    overlay?: string;
    content?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
}

const Modal = ({
  open,
  onOpenChange,
  onClose,
  trigger,
  title,
  description,
  footer,
  children,
  size,
  width,
  showClose = true,
  fullscreen = false,
  centered = true,
  okText = "OK",
  cancelText = "Cancel",
  onOk,
  onCancel,
  okLoading = false,
  okDisabled = false,
  noFooter = false,
  classNames,
}: ModalProps) => {
  const [internalLoading, setInternalLoading] = React.useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    if (!isOpen) onClose?.();
  };

  const handleOk = async () => {
    if (!onOk) return;
    const result = onOk();
    if (result instanceof Promise) {
      setInternalLoading(true);
      try {
        await result;
        handleOpenChange(false);
      } finally {
        setInternalLoading(false);
      }
    } else {
      handleOpenChange(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    handleOpenChange(false);
  };

  const isLoading = okLoading || internalLoading;

  const showBuiltinFooter = !noFooter && !footer && (onOk || onCancel);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        size={fullscreen ? "full" : size}
        showClose={showClose}
        className={classNames?.content}
        style={width ? { maxWidth: width, width: "100%" } : undefined}
      >
        {(title || description) && (
          <DialogHeader className={classNames?.header}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div className={cn("flex-1", classNames?.body)}>{children}</div>
        {footer && (
          <DialogFooter className={classNames?.footer}>{footer}</DialogFooter>
        )}
        {showBuiltinFooter && (
          <DialogFooter className={classNames?.footer}>
            {onCancel !== undefined && (
              <button
                type="button"
                className={cn(
                  "inline-flex items-center justify-center rounded-md border border-input bg-background",
                  "px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
                onClick={handleCancel}
              >
                {cancelText}
              </button>
            )}
            {onOk !== undefined && (
              <button
                type="button"
                disabled={okDisabled || isLoading}
                className={cn(
                  "inline-flex items-center justify-center rounded-md bg-primary",
                  "px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "disabled:pointer-events-none disabled:opacity-50"
                )}
                onClick={handleOk}
              >
                {isLoading && (
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
                {okText}
              </button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export {
  Modal,
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogContentVariants,
};
