'use client'

import * as React from 'react'
import { CheckIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'

export interface ColorSwatchItem {
  color: string
  title?: string
  key?: string
}

export interface ColorSwatchesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  colors: ColorSwatchItem[]
  value?: string
  defaultValue?: string
  onChange?: (color: string | undefined) => void
  size?: number
  shape?: 'circle' | 'square'
}

const ColorSwatches = React.forwardRef<HTMLDivElement, ColorSwatchesProps>(
  (
    {
      colors,
      value: controlledValue,
      defaultValue,
      onChange,
      size = 24,
      shape = 'circle',
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = controlledValue ?? internalValue

    const handleSelect = React.useCallback(
      (color: string) => {
        const newValue = color === value ? undefined : color
        if (controlledValue === undefined) {
          setInternalValue(newValue)
        }
        onChange?.(newValue)
      },
      [value, controlledValue, onChange],
    )

    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap gap-1.5', className)}
        role="radiogroup"
        {...props}
      >
        {colors.map((item, index) => {
          const isActive = item.color === value
          const swatch = (
            <button
              key={item.key ?? index}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={item.title || item.color}
              className={cn(
                'relative flex shrink-0 touch-manipulation items-center justify-center transition-all',
                'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive && 'ring-2 ring-ring ring-offset-2',
                shape === 'circle' ? 'rounded-full' : 'rounded-md',
              )}
              style={{
                width: Math.max(size, 32),
                height: Math.max(size, 32),
                backgroundColor: item.color,
              }}
              onClick={() => handleSelect(item.color)}
            >
              {isActive && (
                <CheckIcon
                  className="h-3 w-3 drop-shadow-sm"
                  style={{
                    color: isLightColor(item.color) ? '#000' : '#fff',
                  }}
                  strokeWidth={3}
                />
              )}
            </button>
          )

          if (item.title) {
            return (
              <Tooltip key={item.key ?? index}>
                <TooltipTrigger asChild>{swatch}</TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          }

          return swatch
        })}
      </div>
    )
  },
)
ColorSwatches.displayName = 'ColorSwatches'

function isLightColor(color: string): boolean {
  const hex = color.replace('#', '')
  if (hex.length !== 6 && hex.length !== 3) return false
  const fullHex = hex.length === 3
    ? hex.split('').map(c => c + c).join('')
    : hex
  const r = parseInt(fullHex.substring(0, 2), 16)
  const g = parseInt(fullHex.substring(2, 4), 16)
  const b = parseInt(fullHex.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}

export { ColorSwatches }
