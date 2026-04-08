"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ActionIcon, type ActionIconProps } from "../action-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown";

const actionIconGroupVariants = cva(
  "inline-flex items-center rounded-md overflow-hidden",
  {
    variants: {
      variant: {
        filled: "bg-muted border border-border",
        outlined: "bg-transparent border border-border",
        borderless: "bg-transparent",
        ghost: "bg-transparent",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      shadow: {
        true: "shadow-sm",
        false: "",
      },
    },
    defaultVariants: {
      variant: "filled",
      orientation: "horizontal",
      shadow: false,
    },
  }
);

export interface ActionIconGroupItem {
  key: string;
  icon: React.ReactNode;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  danger?: boolean;
}

export interface ActionIconGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof actionIconGroupVariants> {
  items?: ActionIconGroupItem[];
  size?: "xs" | "small" | "default" | "middle" | "large" | "lg" | "xl";
  disabled?: boolean;
  actionIconProps?: Partial<ActionIconProps>;
  menu?: ActionIconGroupItem[];
  onActionClick?: (key: string, e: React.MouseEvent) => void;
}

const ActionIconGroup = React.forwardRef<HTMLDivElement, ActionIconGroupProps>(
  (
    {
      className,
      variant,
      orientation,
      shadow,
      items = [],
      size = "sm",
      disabled,
      actionIconProps,
      menu,
      onActionClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          actionIconGroupVariants({ variant, orientation, shadow }),
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <ActionIcon
            key={item.key}
            size={size as any}
            tooltip={item.label}
            disabled={disabled || item.disabled}
            loading={item.loading}
            danger={item.danger}
            onClick={(e) => {
              item.onClick?.(e);
              onActionClick?.(item.key, e);
            }}
            className={cn(
              "rounded-none",
              variant === "filled" || variant === "outlined"
                ? orientation === "horizontal"
                  ? "border-r border-border last:border-r-0"
                  : "border-b border-border last:border-b-0"
                : ""
            )}
            {...actionIconProps}
          >
            {item.icon}
          </ActionIcon>
        ))}
        {menu && menu.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ActionIcon
                size={size as any}
                disabled={disabled}
                className={cn(
                  "rounded-none",
                  variant === "filled" || variant === "outlined"
                    ? orientation === "horizontal"
                      ? "border-r border-border last:border-r-0"
                      : "border-b border-border last:border-b-0"
                    : ""
                )}
                {...actionIconProps}
              >
                <MoreHorizontal />
              </ActionIcon>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {menu.map((item) => (
                <DropdownMenuItem
                  key={item.key}
                  disabled={item.disabled}
                  onClick={(e) => {
                    item.onClick?.(e);
                    onActionClick?.(item.key, e);
                  }}
                  className={item.danger ? "text-destructive focus:text-destructive" : ""}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );
  }
);

ActionIconGroup.displayName = "ActionIconGroup";

export { ActionIconGroup, actionIconGroupVariants };
