"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const timelineDotVariants = cva(
  "relative z-10 flex shrink-0 items-center justify-center rounded-full border-2",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground",
        outlined: "border-primary bg-background text-primary",
        success: "border-success bg-success text-success-foreground",
        warning: "border-warning bg-warning text-warning-foreground",
        destructive: "border-destructive bg-destructive text-destructive-foreground",
        muted: "border-muted-foreground bg-muted text-muted-foreground",
      },
      size: {
        sm: "h-6 w-6",
        default: "h-8 w-8",
        lg: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TimelineItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, "title"> {
  dot?: React.ReactNode;
  dotVariant?: VariantProps<typeof timelineDotVariants>["variant"];
  dotSize?: VariantProps<typeof timelineDotVariants>["size"];
  title?: React.ReactNode;
  extra?: React.ReactNode;
  time?: React.ReactNode;
  pending?: boolean;
  last?: boolean;
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      className,
      dot,
      dotVariant = "default",
      dotSize = "default",
      title,
      extra,
      time,
      pending = false,
      last = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <li
        ref={ref}
        className={cn("relative flex gap-4", className)}
        {...props}
      >
        {/* Left: dot + connector line */}
        <div className="flex flex-col items-center">
          <div
            className={cn(
              timelineDotVariants({ variant: dotVariant, size: dotSize }),
              pending && "opacity-50"
            )}
          >
            {dot && (
              <span className="text-xs leading-none">{dot}</span>
            )}
          </div>
          {!last && (
            <div
              className={cn(
                "mt-1 flex-1 w-0.5 bg-border min-h-[24px]",
                pending && "border-dashed border-l-2 border-border w-0 bg-transparent"
              )}
            />
          )}
        </div>

        {/* Right: content */}
        <div className={cn("flex-1 pb-6 min-w-0", last && "pb-0")}>
          {(title || time || extra) && (
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex-1 min-w-0">
                {title && (
                  <div className="font-medium text-sm leading-tight truncate">
                    {title}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {extra}
                {time && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {time}
                  </span>
                )}
              </div>
            </div>
          )}
          {children && (
            <div className="text-sm text-muted-foreground">{children}</div>
          )}
        </div>
      </li>
    );
  }
);

TimelineItem.displayName = "TimelineItem";

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  mode?: "left" | "alternate" | "right";
  pending?: React.ReactNode;
  pendingDot?: React.ReactNode;
  reverse?: boolean;
}

const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
  (
    {
      className,
      children,
      mode = "left",
      pending,
      pendingDot,
      reverse = false,
      ...props
    },
    ref
  ) => {
    const items = React.Children.toArray(children);
    const orderedItems = reverse ? [...items].reverse() : items;
    const count = orderedItems.length;

    return (
      <ul
        ref={ref}
        className={cn("flex flex-col", className)}
        {...props}
      >
        {orderedItems.map((child, idx) => {
          const isLast = idx === count - 1 && !pending;
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<TimelineItemProps>, {
              last: isLast,
              key: idx,
            });
          }
          return child;
        })}
        {pending && (
          <TimelineItem
            dot={pendingDot}
            dotVariant="muted"
            pending
            last
          >
            {pending}
          </TimelineItem>
        )}
      </ul>
    );
  }
);

Timeline.displayName = "Timeline";

export { Timeline, TimelineItem, timelineDotVariants };
