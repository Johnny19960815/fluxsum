"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const listVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      bordered: "border border-border rounded-lg overflow-hidden",
      split: "",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

const listItemVariants = cva(
  "flex items-center gap-3 transition-colors cursor-default",
  {
    variants: {
      size: {
        sm: "px-3 py-2 text-sm",
        default: "px-4 py-3 text-sm",
        lg: "px-4 py-4",
      },
      active: {
        true: "bg-accent text-accent-foreground",
        false: "hover:bg-accent/50",
      },
      clickable: {
        true: "cursor-pointer",
        false: "",
      },
      variant: {
        default: "",
        bordered: "border-b border-border last:border-b-0",
        split: "border-b border-border last:border-b-0",
      },
    },
    defaultVariants: {
      size: "default",
      active: false,
      clickable: false,
      variant: "default",
    },
  }
);

export interface ListItemType {
  key: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  avatar?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export interface ListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof listVariants> {
  items: ListItemType[];
  activeKey?: string;
  loading?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: (info: { key: string; item: ListItemType }) => void;
  renderItem?: (item: ListItemType) => React.ReactNode;
}

const ListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    item: ListItemType;
    active?: boolean;
    size?: VariantProps<typeof listItemVariants>["size"];
    listVariant?: VariantProps<typeof listItemVariants>["variant"];
    onItemClick?: (info: { key: string; item: ListItemType }) => void;
  }
>(({ item, active, size, listVariant, onItemClick, className, ...props }, ref) => {
  const isClickable = !!item.onClick || !!onItemClick;
  return (
    <div
      ref={ref}
      className={cn(
        listItemVariants({
          size,
          active,
          clickable: isClickable && !item.disabled,
          variant: listVariant,
        }),
        item.disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={
        isClickable && !item.disabled
          ? (e) => {
              item.onClick?.(e);
              onItemClick?.({ key: item.key, item });
            }
          : undefined
      }
      {...props}
    >
      {item.avatar && (
        <div className="shrink-0">{item.avatar}</div>
      )}
      {item.icon && (
        <div className="shrink-0 text-muted-foreground">{item.icon}</div>
      )}
      <div className="flex-1 min-w-0">
        {item.label && (
          <div className="truncate font-medium">{item.label}</div>
        )}
        {item.description && (
          <div className="text-xs text-muted-foreground truncate mt-0.5">
            {item.description}
          </div>
        )}
      </div>
      {item.extra && (
        <div className="shrink-0 text-muted-foreground text-sm">{item.extra}</div>
      )}
    </div>
  );
});
ListItem.displayName = "ListItem";

const List = React.forwardRef<HTMLDivElement, ListProps>(
  (
    {
      className,
      variant,
      size,
      items = [],
      activeKey,
      loading,
      header,
      footer,
      onClick,
      renderItem,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(listVariants({ variant }), className)}
        {...props}
      >
        {header && (
          <div className="px-4 py-2 border-b border-border font-medium text-sm">
            {header}
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
            Loading...
          </div>
        ) : items.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
            No data
          </div>
        ) : (
          items.map((item) =>
            renderItem ? (
              <React.Fragment key={item.key}>{renderItem(item)}</React.Fragment>
            ) : (
              <ListItem
                key={item.key}
                item={item}
                active={item.key === activeKey}
                size={size}
                listVariant={variant}
                onItemClick={onClick}
              />
            )
          )
        )}
        {footer && (
          <div className="px-4 py-2 border-t border-border text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

List.displayName = "List";

export { List, ListItem, listVariants, listItemVariants };
