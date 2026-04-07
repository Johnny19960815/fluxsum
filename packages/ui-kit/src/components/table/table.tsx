"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Table 根组件
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableCaption>A list of your recent invoices.</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Invoice</TableHead>
 *       <TableHead>Status</TableHead>
 *       <TableHead className="text-right">Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell className="font-medium">INV001</TableCell>
 *       <TableCell>Paid</TableCell>
 *       <TableCell className="text-right">$250.00</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/**
 * TableHeader 表头容器
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/**
 * TableBody 表体容器
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/**
 * TableFooter 表格底部
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/**
 * TableRow 表格行属性
 */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * 是否可选中
   */
  selectable?: boolean;
}

/**
 * TableRow 表格行
 */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selectable, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors",
        "hover:bg-muted/50",
        "data-[state=selected]:bg-muted",
        selectable && "cursor-pointer",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

/**
 * TableHead 表头单元格属性
 */
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * 是否可排序
   */
  sortable?: boolean;
  /**
   * 排序方向
   */
  sortDirection?: "asc" | "desc" | false;
}

/**
 * TableHead 表头单元格
 */
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-4 text-left align-middle font-medium text-muted-foreground",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        sortable && "cursor-pointer select-none hover:text-foreground",
        className
      )}
      {...props}
    >
      {sortable ? (
        <div className="flex items-center gap-1">
          {children}
          <span className="ml-1 text-muted-foreground">
            {sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "↕"}
          </span>
        </div>
      ) : (
        children
      )}
    </th>
  )
);
TableHead.displayName = "TableHead";

/**
 * TableCell 表格数据单元格
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle",
      "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/**
 * TableCaption 表格标题/描述
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
