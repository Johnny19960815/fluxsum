"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const accordionVariants = cva("w-full", {
  variants: {
    variant: {
      borderless: "",
      filled: "rounded-lg bg-muted/50",
      outlined: "rounded-lg border border-border",
    },
  },
  defaultVariants: {
    variant: "borderless",
  },
});

const accordionItemVariants = cva("", {
  variants: {
    variant: {
      borderless: "border-b border-border last:border-b-0",
      filled: "border-b border-border/50 last:border-b-0",
      outlined: "border-b border-border last:border-b-0",
    },
  },
  defaultVariants: {
    variant: "borderless",
  },
});

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  gap?: number;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "horizontal" | "vertical";
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, variant, gap, style, type = "single", defaultValue, value, onValueChange, collapsible, disabled, dir, orientation, ...props }, ref) => (
    <AccordionPrimitive.Root
      ref={ref as any}
      type={type as any}
      defaultValue={defaultValue as any}
      value={value as any}
      onValueChange={onValueChange as any}
      collapsible={collapsible as any}
      disabled={disabled}
      dir={dir}
      orientation={orientation}
      className={cn(accordionVariants({ variant }), className)}
      style={{ gap: gap !== undefined ? `${gap}px` : undefined, ...style }}
      {...(props as any)}
    />
  )
);
Accordion.displayName = "Accordion";

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {
  action?: React.ReactNode;
  disabled?: boolean;
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, action, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      accordionItemVariants({ variant }),
      props.disabled && "opacity-50 pointer-events-none",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  indicatorPlacement?: "start" | "end";
  hideIndicator?: boolean;
  indicator?: React.ReactNode;
  action?: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(
  (
    {
      className,
      children,
      indicatorPlacement = "end",
      hideIndicator = false,
      indicator,
      action,
      ...props
    },
    ref
  ) => {
    const chevron = !hideIndicator && (
      <span className="flex-none">
        {indicator ?? (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/trigger:rotate-180" />
        )}
      </span>
    );

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            "group/trigger flex flex-1 items-center gap-2 py-3 px-4 text-sm font-medium",
            "transition-all text-left hover:bg-accent/50 rounded-md",
            "[&[data-state=open]>span:last-child>svg]:rotate-180",
            "[&[data-state=open]>.accordion-indicator>svg]:rotate-180",
            className
          )}
          {...props}
        >
          {indicatorPlacement === "start" && chevron && (
            <span className="accordion-indicator flex-none">{chevron}</span>
          )}
          <span className="flex-1 truncate">{children}</span>
          {action && (
            <span
              className="flex-none flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {action}
            </span>
          )}
          {indicatorPlacement === "end" && chevron && (
            <span className="accordion-indicator flex-none">{chevron}</span>
          )}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  innerClassName?: string;
  paddingBlock?: number | string;
  paddingInline?: number | string;
}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, innerClassName, paddingBlock, paddingInline, style, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div
      className={cn("pb-4 pt-0 px-4", innerClassName)}
      style={{
        paddingBlock: paddingBlock !== undefined ? paddingBlock : undefined,
        paddingInline: paddingInline !== undefined ? paddingInline : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, accordionVariants };
