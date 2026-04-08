"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const drawerVariants = cva(
  "fixed z-50 flex flex-col bg-background shadow-xl outline-none",
  {
    variants: {
      placement: {
        right: [
          "inset-y-0 right-0 h-full border-l border-border",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
          "duration-300",
        ],
        left: [
          "inset-y-0 left-0 h-full border-r border-border",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
          "duration-300",
        ],
        top: [
          "inset-x-0 top-0 w-full border-b border-border",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
          "duration-300",
        ],
        bottom: [
          "inset-x-0 bottom-0 w-full border-t border-border",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          "duration-300",
        ],
      },
    },
    defaultVariants: {
      placement: "right",
    },
  }
);

export interface DrawerProps extends VariantProps<typeof drawerVariants> {
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  noHeader?: boolean;
  closeIcon?: React.ReactNode;
  containerMaxWidth?: number | string;
  sidebar?: React.ReactNode;
  sidebarWidth?: number;
  className?: string;
  classNames?: {
    overlay?: string;
    content?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
}

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName;

const Drawer = ({
  open,
  onClose,
  onOpenChange,
  title,
  children,
  footer,
  extra,
  width,
  height,
  noHeader = false,
  closeIcon,
  placement = "right",
  containerMaxWidth,
  sidebar,
  sidebarWidth = 280,
  className,
  classNames,
}: DrawerProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    if (!isOpen) onClose?.();
  };

  const isHorizontal = placement === "left" || placement === "right";
  const dimensionStyle: React.CSSProperties = {
    width: isHorizontal ? (width ?? 400) : undefined,
    height: !isHorizontal ? (height ?? 320) : undefined,
    maxWidth: isHorizontal && containerMaxWidth ? containerMaxWidth : undefined,
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DrawerOverlay className={classNames?.overlay} />
        <DialogPrimitive.Content
          className={cn(
            drawerVariants({ placement }),
            classNames?.content,
            className
          )}
          style={dimensionStyle}
        >
          {!noHeader && (
            <div
              className={cn(
                "flex items-center justify-between shrink-0 px-4 py-3 border-b border-border",
                classNames?.header
              )}
            >
              <div className="font-semibold text-base truncate flex-1 mr-2">
                {title}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {extra}
                <button
                  type="button"
                  className={cn(
                    "h-8 w-8 rounded-md flex items-center justify-center",
                    "text-muted-foreground hover:text-foreground hover:bg-accent",
                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                  onClick={onClose}
                  aria-label="Close drawer"
                >
                  {closeIcon ?? <X className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {noHeader && (
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
              {extra}
              <button
                type="button"
                className={cn(
                  "h-8 w-8 rounded-md flex items-center justify-center",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  "transition-colors"
                )}
                onClick={onClose}
                aria-label="Close drawer"
              >
                {closeIcon ?? <X className="h-4 w-4" />}
              </button>
            </div>
          )}

          <div className={cn("flex flex-1 overflow-hidden")}>
            {sidebar && (
              <div
                className="shrink-0 border-r border-border overflow-y-auto bg-muted/30 py-3 px-4"
                style={{ width: sidebarWidth }}
              >
                {sidebar}
              </div>
            )}
            <div
              className={cn(
                "flex-1 overflow-y-auto p-4",
                classNames?.body
              )}
            >
              {children}
            </div>
          </div>

          {footer && (
            <div
              className={cn(
                "shrink-0 border-t border-border px-4 py-3 flex items-center justify-end gap-2",
                classNames?.footer
              )}
            >
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

Drawer.displayName = "Drawer";

export { Drawer, DrawerOverlay, drawerVariants };
