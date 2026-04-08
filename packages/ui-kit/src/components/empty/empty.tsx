"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  image?: React.ReactNode;
  icon?: React.ReactNode;
  imageSize?: number;
  action?: React.ReactNode;
  type?: "default" | "page";
  align?: "center" | "flex-start" | "start";
}

const EmptyDefaultImage = () => (
  <svg
    viewBox="0 0 184 152"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-auto w-[120px] opacity-40"
  >
    <g fillRule="evenodd" clipRule="evenodd">
      <path
        d="M123.516 10H60.485C55.765 10 51.444 12.658 49.138 16.793L15.622 76.234C13.316 80.37 13.316 85.63 15.622 89.766L49.138 149.207C51.444 153.342 55.765 156 60.485 156H123.516C128.236 156 132.557 153.342 134.863 149.207L168.379 89.766C170.685 85.63 170.685 80.37 168.379 76.234L134.863 16.793C132.557 12.658 128.236 10 123.516 10z"
        fill="currentColor"
        opacity="0.07"
      />
      <path
        d="M122.326 14H61.675C57.435 14 53.54 16.324 51.438 20.044L20.112 75.956C18.01 79.676 18.01 84.324 20.112 88.044L51.438 143.956C53.54 147.676 57.435 150 61.675 150H122.326C126.566 150 130.461 147.676 132.563 143.956L163.888 88.044C165.99 84.324 165.99 79.676 163.888 75.956L132.563 20.044C130.461 16.324 126.566 14 122.326 14z"
        fill="currentColor"
        opacity="0.04"
      />
      <path
        d="M91 80C96.523 80 101 75.523 101 70C101 64.477 96.523 60 91 60C85.477 60 81 64.477 81 70C81 75.523 85.477 80 91 80z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M91 92V86M91 112V106M75.072 94.5L70.072 102.16M111.928 94.5L106.928 102.16"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.3"
      />
    </g>
  </svg>
);

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      className,
      title,
      description,
      image,
      icon,
      imageSize = 48,
      action,
      children,
      type = "default",
      align,
      ...props
    },
    ref
  ) => {
    const isPage = type === "page";
    const resolvedAlign = align ?? (isPage ? "flex-start" : "center");
    const isCenter = resolvedAlign === "center";

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 p-4",
          isCenter ? "items-center text-center" : "items-start text-left",
          className
        )}
        {...props}
      >
        {image ? (
          image
        ) : icon ? (
          <div
            className={cn(
              "flex items-center justify-center rounded-lg border border-border bg-muted/50 shrink-0",
              isCenter && "mx-auto"
            )}
            style={{ width: imageSize, height: imageSize }}
          >
            <span
              className="text-muted-foreground"
              style={{ fontSize: imageSize * 0.5 }}
            >
              {icon}
            </span>
          </div>
        ) : (
          <div className={cn(isCenter && "mx-auto")}>
            <EmptyDefaultImage />
          </div>
        )}

        <div
          className={cn(
            "flex flex-col",
            isPage ? "gap-1" : "gap-0.5",
            isCenter ? "items-center" : "items-start"
          )}
        >
          {title && (
            <span
              className={cn(
                "font-bold text-foreground",
                isPage ? "text-2xl" : "text-base"
              )}
            >
              {title}
            </span>
          )}
          {description && (
            <span
              className={cn(
                "text-muted-foreground",
                isPage ? "text-base" : "text-sm"
              )}
            >
              {description}
            </span>
          )}
        </div>

        {children}

        {action && (
          <div className={cn("flex gap-2", isCenter && "justify-center")}>
            {action}
          </div>
        )}
      </div>
    );
  }
);

Empty.displayName = "Empty";

export { Empty };
