'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { CopyButton } from './CopyButton'

const snippetVariants = cva(
  'inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 font-mono text-sm sm:min-h-0',
  {
    variants: {
      variant: {
        filled: 'bg-muted text-foreground',
        outlined: 'border border-border bg-background text-foreground',
        ghost: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  },
)

export interface SnippetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof snippetVariants> {
  prefix?: string
  copyable?: boolean
  symbol?: string
}

const Snippet = React.forwardRef<HTMLDivElement, SnippetProps>(
  (
    {
      children,
      prefix,
      copyable = true,
      symbol = '$',
      variant,
      className,
      ...props
    },
    ref,
  ) => {
    const content = typeof children === 'string' ? children.trim() : String(children || '')

    return (
      <div
        ref={ref}
        className={cn(snippetVariants({ variant }), className)}
        {...props}
      >
        <code className="flex-1 truncate">
          {symbol && <span className="mr-2 select-none text-muted-foreground">{symbol}</span>}
          {prefix && <span className="text-muted-foreground">{prefix} </span>}
          {content}
        </code>
        {copyable && (
          <CopyButton
            content={content}
            size="icon"
            className="h-7 w-7 shrink-0"
          />
        )}
      </div>
    )
  },
)
Snippet.displayName = 'Snippet'

export { Snippet, snippetVariants }
