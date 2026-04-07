"use client";

import * as React from "react";
import { ChevronRight, MoreHorizontal, Slash } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Breadcrumb 面包屑根容器
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

/**
 * BreadcrumbList 面包屑列表
 */
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

/**
 * BreadcrumbItem 面包屑项
 */
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * BreadcrumbLink 面包屑链接
 */
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "a";

  return (
    <Comp
      ref={ref as React.Ref<HTMLAnchorElement>}
      className={cn(
        "transition-colors hover:text-foreground cursor-pointer",
        className
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

/**
 * BreadcrumbPage 当前页（不可点击）
 */
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

/**
 * BreadcrumbSeparator 面包屑分隔符
 */
const BreadcrumbSeparator = ({
  children,
  className,
  variant = "chevron",
  ...props
}: React.ComponentProps<"li"> & {
  /**
   * 分隔符样式
   * @default "chevron"
   */
  variant?: "chevron" | "slash";
}) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className)}
    {...props}
  >
    {children ?? (
      variant === "slash"
        ? <Slash className="h-3.5 w-3.5" />
        : <ChevronRight className="h-3.5 w-3.5" />
    )}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/**
 * BreadcrumbEllipsis 折叠省略号
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipsis";

/**
 * BreadcrumbItem data 类型
 */
export interface BreadcrumbItemData {
  label: string;
  href?: string;
  onClick?: () => void;
}

/**
 * SimpleBreadcrumb 简化版面包屑属性
 */
export interface SimpleBreadcrumbProps {
  /**
   * 面包屑路径数组
   */
  items: BreadcrumbItemData[];
  /**
   * 分隔符样式
   */
  separator?: "chevron" | "slash";
  /**
   * 最多显示项数（超出时折叠中间项）
   */
  maxItems?: number;
  className?: string;
}

/**
 * SimpleBreadcrumb 简化版面包屑
 *
 * @example
 * ```tsx
 * <SimpleBreadcrumb
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Components", href: "/components" },
 *     { label: "Breadcrumb" },
 *   ]}
 * />
 * ```
 */
const SimpleBreadcrumb = ({
  items,
  separator = "chevron",
  maxItems,
  className,
}: SimpleBreadcrumbProps) => {
  const shouldCollapse = maxItems !== undefined && items.length > maxItems;

  const visibleItems = React.useMemo(() => {
    if (!shouldCollapse) return items;
    const firstCount = 1;
    const lastCount = maxItems! - firstCount;
    return [
      ...items.slice(0, firstCount),
      null,
      ...items.slice(items.length - lastCount),
    ];
  }, [items, shouldCollapse, maxItems]);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          if (item === null) {
            return (
              <React.Fragment key="ellipsis">
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator variant={separator} />}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator variant={separator} />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  SimpleBreadcrumb,
};
