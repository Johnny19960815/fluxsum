"use client";

import * as React from "react";
import { Toaster as Sonner, toast } from "sonner";
import { cn } from "../../lib/utils";

/**
 * ToasterProps - Toaster 组件属性
 */
export type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Toaster 通知容器组件
 *
 * 需要在应用根节点挂载一次，用于渲染所有 Toast 通知。
 * 使用 `toast` 函数触发通知。
 *
 * @example
 * ```tsx
 * // 在 App 根节点
 * <Toaster position="top-right" />
 *
 * // 在任意组件内触发
 * toast("Event created")
 * toast.success("Profile updated successfully!")
 * toast.error("Something went wrong")
 * toast.warning("Low disk space")
 * toast.info("Update available")
 * toast.promise(saveData(), {
 *   loading: "Saving...",
 *   success: "Saved!",
 *   error: "Failed to save",
 * })
 * ```
 */
const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      className={cn(className)}
      toastOptions={{
        classNames: {
          toast: [
            "group toast",
            "group-[.toaster]:bg-background group-[.toaster]:text-foreground",
            "group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          ].join(" "),
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:!bg-success/10 group-[.toaster]:!text-success group-[.toaster]:!border-success/30",
          error:
            "group-[.toaster]:!bg-destructive/10 group-[.toaster]:!text-destructive group-[.toaster]:!border-destructive/30",
          warning:
            "group-[.toaster]:!bg-warning/10 group-[.toaster]:!text-warning group-[.toaster]:!border-warning/30",
          info: "group-[.toaster]:!bg-info/10 group-[.toaster]:!text-info group-[.toaster]:!border-info/30",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
