"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const statisticValueVariants = cva("font-semibold tabular-nums leading-none", {
  variants: {
    size: {
      sm: "text-xl",
      default: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface StatisticProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "prefix">,
    VariantProps<typeof statisticValueVariants> {
  title?: React.ReactNode;
  value?: number | string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  precision?: number;
  loading?: boolean;
  formatter?: (value: number | string) => React.ReactNode;
  valueStyle?: React.CSSProperties;
  decimalSeparator?: string;
  groupSeparator?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: React.ReactNode;
}

function formatNumber(
  value: number | string,
  precision?: number,
  decimalSeparator = ".",
  groupSeparator = ","
): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);

  const fixed = precision !== undefined ? num.toFixed(precision) : String(num);
  const [intPart, decPart] = fixed.split(".");

  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
  return decPart !== undefined
    ? `${formattedInt}${decimalSeparator}${decPart}`
    : formattedInt;
}

const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(
  (
    {
      className,
      title,
      value,
      prefix,
      suffix,
      precision,
      loading = false,
      formatter,
      valueStyle,
      size,
      decimalSeparator = ".",
      groupSeparator = ",",
      trend,
      trendValue,
      ...props
    },
    ref
  ) => {
    const displayValue = React.useMemo(() => {
      if (value === undefined || value === null) return "-";
      if (formatter) return formatter(value);
      return formatNumber(value, precision, decimalSeparator, groupSeparator);
    }, [value, formatter, precision, decimalSeparator, groupSeparator]);

    const trendColor =
      trend === "up"
        ? "text-emerald-600 dark:text-emerald-400"
        : trend === "down"
        ? "text-red-600 dark:text-red-400"
        : "text-muted-foreground";

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
        {title && (
          <div className="text-sm text-muted-foreground">{title}</div>
        )}
        <div className="flex items-baseline gap-1 flex-wrap">
          {prefix && (
            <span className="text-muted-foreground text-sm shrink-0">
              {prefix}
            </span>
          )}
          {loading ? (
            <div className="h-8 w-24 rounded bg-muted animate-pulse" />
          ) : (
            <span
              className={cn(statisticValueVariants({ size }))}
              style={valueStyle}
            >
              {displayValue}
            </span>
          )}
          {suffix && (
            <span className="text-muted-foreground text-sm shrink-0">
              {suffix}
            </span>
          )}
        </div>
        {trend && trendValue && (
          <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
            <span>{trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    );
  }
);

Statistic.displayName = "Statistic";

export interface StatisticGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StatisticProps[];
  columns?: 1 | 2 | 3 | 4;
  divided?: boolean;
}

const StatisticGroup = React.forwardRef<HTMLDivElement, StatisticGroupProps>(
  ({ className, items, columns = 3, divided = false, ...props }, ref) => {
    const colClass = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[columns];

    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-6",
          colClass,
          divided && "divide-x divide-border",
          className
        )}
        {...props}
      >
        {items.map((item, idx) => (
          <Statistic
            key={idx}
            {...item}
            className={cn(divided && "px-6 first:pl-0 last:pr-0", item.className)}
          />
        ))}
      </div>
    );
  }
);

StatisticGroup.displayName = "StatisticGroup";

export { Statistic, StatisticGroup, statisticValueVariants };
