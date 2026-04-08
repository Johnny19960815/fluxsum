"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { CopyButton } from "../copy-button";

const snippetVariants = cva(
  "flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm",
  {
    variants: {
      variant: {
        filled: "bg-muted border border-border",
        outlined: "bg-transparent border border-border",
        ghost: "bg-transparent",
      },
      shadow: {
        true: "shadow-sm",
        false: "",
      },
    },
    defaultVariants: {
      variant: "filled",
      shadow: false,
    },
  }
);

export interface SnippetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix">,
    VariantProps<typeof snippetVariants> {
  children: string;
  prefix?: string;
  copyable?: boolean;
  language?: string;
}

const Snippet = React.forwardRef<HTMLDivElement, SnippetProps>(
  (
    {
      className,
      variant,
      shadow,
      children,
      prefix,
      copyable = true,
      ...props
    },
    ref
  ) => {
    const trimmed = children.trim();
    const displayText = [prefix, trimmed].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        className={cn(snippetVariants({ variant, shadow }), className)}
        {...props}
      >
        <code className="flex-1 text-foreground overflow-x-auto whitespace-pre scrollbar-none">
          {displayText}
        </code>
        {copyable && (
          <CopyButton
            content={trimmed}
            variant="ghost"
            size="sm"
            className="shrink-0 -mr-1"
          />
        )}
      </div>
    );
  }
);

Snippet.displayName = "Snippet";

export { Snippet, snippetVariants };
