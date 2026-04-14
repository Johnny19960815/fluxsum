'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const segmentedVariants = cva(
  'inline-flex max-w-full items-center overflow-x-auto rounded-lg p-1 text-muted-foreground',
  {
    variants: {
      variant: {
        filled: 'bg-muted',
        outlined: 'border border-border bg-background',
      },
      size: {
        sm: 'h-8 text-xs',
        default: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'default',
    },
  },
)

const segmentedItemVariants = cva(
  'inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-md px-3 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:min-h-0',
  {
    variants: {
      size: {
        sm: 'h-6 text-xs',
        default: 'h-8 text-sm',
        lg: 'h-10 text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export interface SegmentedOption<T extends string = string> {
  value: T
  label: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
}

export interface SegmentedProps<T extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof segmentedVariants> {
  options: SegmentedOption<T>[]
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  block?: boolean
}

function SegmentedInner<T extends string = string>(
  {
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    variant,
    size,
    block,
    className,
    ...props
  }: SegmentedProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [internalValue, setInternalValue] = React.useState<T>(
    () => controlledValue ?? defaultValue ?? options[0]?.value ?? ('' as T),
  )
  const value = controlledValue ?? internalValue

  const handleSelect = React.useCallback(
    (val: T) => {
      if (controlledValue === undefined) {
        setInternalValue(val)
      }
      onChange?.(val)
    },
    [controlledValue, onChange],
  )

  return (
    <div
      ref={ref}
      role="tablist"
      className={cn(segmentedVariants({ variant, size }), block && 'flex w-full', className)}
      {...props}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          disabled={option.disabled}
          className={cn(
            segmentedItemVariants({ size }),
            block && 'flex-1',
            value === option.value
              ? 'bg-background text-foreground shadow-sm'
              : 'hover:text-foreground/80',
          )}
          onClick={() => handleSelect(option.value)}
        >
          {option.icon && <span className="mr-1.5">{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  )
}

const Segmented = React.forwardRef(SegmentedInner) as <T extends string = string>(
  props: SegmentedProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement

export { Segmented, segmentedVariants }
