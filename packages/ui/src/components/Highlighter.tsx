'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { CopyButton } from './CopyButton'

const highlighterVariants = cva(
  'group relative overflow-hidden rounded-lg font-mono text-sm',
  {
    variants: {
      variant: {
        filled: 'bg-muted',
        outlined: 'border border-border bg-background',
        ghost: 'bg-transparent',
      },
      wrap: {
        true: '[&_pre]:whitespace-pre-wrap [&_pre]:break-words',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'filled',
      wrap: false,
    },
  },
)

export interface HighlighterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof highlighterVariants> {
  language?: string
  children: string
  copyable?: boolean
  showLanguage?: boolean
  fileName?: string
}

const Highlighter = React.forwardRef<HTMLDivElement, HighlighterProps>(
  (
    {
      children,
      language = 'text',
      copyable = true,
      showLanguage = true,
      fileName,
      variant,
      wrap,
      className,
      ...props
    },
    ref,
  ) => {
    const content = typeof children === 'string' ? children.trim() : String(children || '')
    const displayName = fileName || language

    return (
      <div
        ref={ref}
        data-language={language}
        className={cn(highlighterVariants({ variant, wrap }), className)}
        {...props}
      >
        {copyable && (
          <div className="absolute right-2 top-2 z-10 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <CopyButton content={content} className="h-7 w-7 bg-background/80 backdrop-blur-sm" />
          </div>
        )}
        {showLanguage && displayName && (
          <div className="absolute bottom-2 right-2 select-none rounded bg-muted-foreground/10 px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">
            {displayName}
          </div>
        )}
        <pre className="overflow-x-auto p-4">
          <code className={`language-${language}`}>{content}</code>
        </pre>
      </div>
    )
  },
)
Highlighter.displayName = 'Highlighter'

export { Highlighter, highlighterVariants }
