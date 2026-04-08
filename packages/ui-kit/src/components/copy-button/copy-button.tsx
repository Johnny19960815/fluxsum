"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const copyButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        ghost: "hover:bg-accent hover:text-accent-foreground text-muted-foreground",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground text-muted-foreground",
        filled: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        xs: "h-5 w-5",
        sm: "h-7 w-7",
        default: "h-8 w-8",
        lg: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
    },
  }
);

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onCopy">,
    VariantProps<typeof copyButtonVariants> {
  content: string;
  timeout?: number;
  onCopy?: (content: string) => void;
  copyIcon?: React.ReactNode;
  checkIcon?: React.ReactNode;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      className,
      variant,
      size,
      content,
      timeout = 2000,
      onCopy,
      copyIcon,
      checkIcon,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = React.useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(content);
          setCopied(true);
          onCopy?.(content);
          setTimeout(() => setCopied(false), timeout);
        } catch {
          // Fallback for older browsers
          const el = document.createElement("textarea");
          el.value = content;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
          setCopied(true);
          onCopy?.(content);
          setTimeout(() => setCopied(false), timeout);
        }
      },
      [content, timeout, onCopy]
    );

    const iconSize =
      size === "xs" ? "h-3 w-3" : size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

    return (
      <button
        ref={ref}
        type="button"
        aria-label={copied ? "Copied!" : "Copy to clipboard"}
        onClick={handleCopy}
        className={cn(copyButtonVariants({ variant, size }), className)}
        {...props}
      >
        {copied ? (
          checkIcon ?? <Check className={cn(iconSize, "text-success")} />
        ) : (
          copyIcon ?? <Copy className={iconSize} />
        )}
      </button>
    );
  }
);

CopyButton.displayName = "CopyButton";

export { CopyButton, copyButtonVariants };
