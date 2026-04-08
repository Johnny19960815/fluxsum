"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const collapseVariants = cva("w-full rounded-lg overflow-hidden", {
  variants: {
    variant: {
      borderless: "",
      filled: "bg-muted/50",
      outlined: "border border-border",
    },
  },
  defaultVariants: {
    variant: "borderless",
  },
});

export interface CollapseItemType {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  desc?: React.ReactNode;
  disabled?: boolean;
  extra?: React.ReactNode;
}

export interface CollapseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof collapseVariants> {
  items: CollapseItemType[];
  defaultActiveKey?: string | string[];
  activeKey?: string | string[];
  onChange?: (key: string | string[]) => void;
  accordion?: boolean;
  collapsible?: boolean;
  gap?: number;
  padding?:
    | number
    | string
    | { body?: number | string; header?: number | string };
  size?: "small" | "default" | "large";
}

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      className,
      variant,
      items,
      defaultActiveKey,
      activeKey: activeKeyProp,
      onChange,
      accordion = false,
      collapsible = true,
      gap = 0,
      padding,
      size = "default",
      style,
      ...props
    },
    ref
  ) => {
    const normalizeKeys = (key?: string | string[]): string[] => {
      if (!key) return [];
      return Array.isArray(key) ? key : [key];
    };

    const [openKeys, setOpenKeys] = React.useState<string[]>(() =>
      normalizeKeys(activeKeyProp ?? defaultActiveKey)
    );

    React.useEffect(() => {
      if (activeKeyProp !== undefined) {
        setOpenKeys(normalizeKeys(activeKeyProp));
      }
    }, [activeKeyProp]);

    const handleToggle = (key: string) => {
      if (!collapsible) return;
      let newKeys: string[];
      if (accordion) {
        newKeys = openKeys.includes(key) ? [] : [key];
      } else {
        newKeys = openKeys.includes(key)
          ? openKeys.filter((k) => k !== key)
          : [...openKeys, key];
      }
      setOpenKeys(newKeys);
      onChange?.(accordion ? newKeys[0] ?? "" : newKeys);
    };

    const headerPadding =
      padding !== undefined
        ? typeof padding === "object"
          ? padding.header
          : padding
        : size === "small"
        ? "6px 12px"
        : size === "large"
        ? "16px 20px"
        : "12px 16px";

    const bodyPadding =
      padding !== undefined
        ? typeof padding === "object"
          ? padding.body
          : padding
        : size === "small"
        ? "8px 12px"
        : size === "large"
        ? "16px 20px"
        : "12px 16px";

    return (
      <div
        ref={ref}
        className={cn(collapseVariants({ variant }), className)}
        style={{ display: "flex", flexDirection: "column", gap, ...style }}
        {...props}
      >
        {items.map((item, index) => {
          const isOpen = openKeys.includes(item.key);
          const isLast = index === items.length - 1;

          return (
            <CollapsiblePrimitive.Root
              key={item.key}
              open={isOpen}
              onOpenChange={() => !item.disabled && handleToggle(item.key)}
            >
              <div
                className={cn(
                  "overflow-hidden",
                  variant === "outlined" && !gap && !isLast && "border-b border-border",
                  variant === "filled" && !gap && !isLast && "border-b border-border/50",
                  variant === "borderless" && !gap && !isLast && "border-b border-border",
                  gap && variant === "outlined" && "border border-border rounded-md",
                  gap && variant === "filled" && "rounded-md bg-muted/50",
                  item.disabled && "opacity-50"
                )}
              >
                <CollapsiblePrimitive.Trigger
                  className={cn(
                    "w-full flex items-center gap-2 text-sm font-medium text-left",
                    "transition-colors hover:bg-accent/50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                    item.disabled && "cursor-not-allowed pointer-events-none"
                  )}
                  style={{ padding: headerPadding as string }}
                  disabled={item.disabled}
                  asChild={false}
                >
                  {item.icon && (
                    <span className="shrink-0 text-muted-foreground">
                      {item.icon}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{item.label}</div>
                    {item.desc && (
                      <div className="text-xs text-muted-foreground font-normal mt-0.5 truncate">
                        {item.desc}
                      </div>
                    )}
                  </div>
                  {item.extra && (
                    <span
                      className="shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.extra}
                    </span>
                  )}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </CollapsiblePrimitive.Trigger>

                <CollapsiblePrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div
                    className="text-sm text-foreground"
                    style={{ padding: bodyPadding as string }}
                  >
                    {item.children}
                  </div>
                </CollapsiblePrimitive.Content>
              </div>
            </CollapsiblePrimitive.Root>
          );
        })}
      </div>
    );
  }
);

Collapse.displayName = "Collapse";

export { Collapse, collapseVariants };
