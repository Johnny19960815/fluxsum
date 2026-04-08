"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Avatar } from "../avatar";

const groupAvatarVariants = cva("relative inline-flex items-center", {
  variants: {
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: { size: "default" },
});

export interface GroupAvatarItem {
  src?: string;
  alt?: string;
  fallback?: string;
}

export interface GroupAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof groupAvatarVariants> {
  avatars: (string | GroupAvatarItem)[];
  max?: number;
  avatarSize?: number;
  overlap?: number;
  shape?: "circle" | "square";
  bordered?: boolean;
}

const GroupAvatar = React.forwardRef<HTMLDivElement, GroupAvatarProps>(
  (
    {
      className,
      avatars = [],
      max = 5,
      avatarSize = 32,
      overlap = 8,
      shape = "circle",
      bordered = true,
      ...props
    },
    ref
  ) => {
    const visible = avatars.slice(0, max);
    const rest = avatars.length - max;

    const sizeClass =
      avatarSize <= 24
        ? "h-6 w-6 text-xs"
        : avatarSize <= 32
        ? "h-8 w-8 text-xs"
        : avatarSize <= 40
        ? "h-10 w-10 text-sm"
        : "h-12 w-12 text-sm";

    const shapeClass = shape === "square" ? "rounded-md" : "rounded-full";

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        style={{ gap: -(overlap) }}
        {...props}
      >
        {visible.map((avatar, i) => {
          const src = typeof avatar === "string" ? avatar : avatar.src;
          const alt = typeof avatar === "string" ? "" : (avatar.alt ?? "");
          const fallback =
            typeof avatar === "string"
              ? undefined
              : avatar.fallback ?? alt?.charAt(0).toUpperCase();

          return (
            <div
              key={i}
              className={cn(
                sizeClass,
                shapeClass,
                "overflow-hidden flex-shrink-0",
                bordered && "ring-2 ring-background"
              )}
              style={{
                width: avatarSize,
                height: avatarSize,
                marginLeft: i === 0 ? 0 : -overlap,
                zIndex: visible.length - i,
              }}
            >
              <Avatar
                src={src}
                alt={alt}
                fallback={fallback}
                className={cn("h-full w-full", shapeClass)}
              />
            </div>
          );
        })}
        {rest > 0 && (
          <div
            className={cn(
              sizeClass,
              shapeClass,
              "flex items-center justify-center bg-muted text-muted-foreground font-medium flex-shrink-0",
              bordered && "ring-2 ring-background"
            )}
            style={{
              width: avatarSize,
              height: avatarSize,
              marginLeft: -overlap,
            }}
          >
            +{rest}
          </div>
        )}
      </div>
    );
  }
);

GroupAvatar.displayName = "GroupAvatar";

export { GroupAvatar, groupAvatarVariants };
