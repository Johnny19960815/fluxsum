'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '../lib/utils'

const collapseVariants = cva('flex flex-col', {
  variants: {
    variant: {
      filled: '[&>div]:bg-muted/50',
      outlined: '[&>div]:border [&>div]:border-border',
      borderless: '',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
})

export interface CollapseItem {
  key: string
  label: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  children: React.ReactNode
  disabled?: boolean
}

export interface CollapseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof collapseVariants> {
  items: CollapseItem[]
  activeKeys?: string[]
  defaultActiveKeys?: string[]
  onChange?: (keys: string[]) => void
  accordion?: boolean
  gap?: number
}

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      items,
      activeKeys: controlledKeys,
      defaultActiveKeys = [],
      onChange,
      accordion = false,
      variant,
      gap = 0,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalKeys, setInternalKeys] = React.useState<string[]>(defaultActiveKeys)
    const activeKeys = controlledKeys ?? internalKeys

    const toggle = React.useCallback(
      (key: string) => {
        let newKeys: string[]
        if (accordion) {
          newKeys = activeKeys.includes(key) ? [] : [key]
        } else {
          newKeys = activeKeys.includes(key)
            ? activeKeys.filter((k) => k !== key)
            : [...activeKeys, key]
        }
        if (controlledKeys === undefined) {
          setInternalKeys(newKeys)
        }
        onChange?.(newKeys)
      },
      [activeKeys, accordion, controlledKeys, onChange],
    )

    return (
      <div
        ref={ref}
        className={cn(collapseVariants({ variant }), className)}
        style={{ gap }}
        {...props}
      >
        {items.map((item) => {
          const isOpen = activeKeys.includes(item.key)
          return (
            <div key={item.key} className="rounded-lg">
              <button
                type="button"
                disabled={item.disabled}
                className={cn(
                  'flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium transition-colors',
                  'hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  item.disabled && 'pointer-events-none opacity-50',
                )}
                aria-expanded={isOpen}
                aria-controls={`collapse-content-${item.key}`}
                onClick={() => toggle(item.key)}
              >
                <ChevronDownIcon
                  className={cn(
                    'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
                    isOpen ? 'rotate-0' : '-rotate-90',
                  )}
                />
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <div className="min-w-0 flex-1">
                  <div className="truncate">{item.label}</div>
                  {item.description && (
                    <div className="mt-0.5 truncate text-xs font-normal text-muted-foreground">
                      {item.description}
                    </div>
                  )}
                </div>
              </button>
              <div
                id={`collapse-content-${item.key}`}
                role="region"
                className={cn(
                  'grid transition-all duration-200',
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-3 pt-0 text-sm">{item.children}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
)
Collapse.displayName = 'Collapse'

export { Collapse, collapseVariants }
