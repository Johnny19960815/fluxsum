'use client'

import * as React from 'react'
import { CheckIcon, CopyIcon, type LucideIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button, type ButtonProps } from './Button'

export interface CopyButtonProps extends Omit<ButtonProps, 'children' | 'content'> {
  content: string | (() => string)
  icon?: LucideIcon
  copiedIcon?: LucideIcon
  copiedDuration?: number
  glass?: boolean
  active?: boolean
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      content,
      icon: Icon = CopyIcon,
      copiedIcon: CopiedIcon = CheckIcon,
      copiedDuration = 2000,
      glass,
      active,
      className,
      variant = 'ghost',
      size = 'icon',
      onClick,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false)
    const timerRef = React.useRef<ReturnType<typeof setTimeout>>()

    React.useEffect(() => {
      return () => {
        clearTimeout(timerRef.current)
      }
    }, [])

    const handleCopy = React.useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        const text = typeof content === 'function' ? content() : content
        let success = false
        try {
          await navigator.clipboard.writeText(text)
          success = true
        } catch {
          try {
            const textarea = document.createElement('textarea')
            textarea.value = text
            textarea.style.position = 'fixed'
            textarea.style.opacity = '0'
            document.body.appendChild(textarea)
            textarea.select()
            success = document.execCommand('copy')
            document.body.removeChild(textarea)
          } catch {
            success = false
          }
        }
        setCopied(success)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setCopied(false), copiedDuration)
        onClick?.(e)
      },
      [content, copiedDuration, onClick],
    )

    return (
      <Button
        ref={ref}
        type="button"
        variant={variant}
        size={size}
        className={cn(
          'relative size-9 min-h-9 min-w-9 shrink-0 touch-manipulation transition-colors',
          glass && 'bg-background/60 backdrop-blur-md',
          className,
        )}
        onClick={handleCopy}
        aria-label={copied ? '已复制' : '复制'}
        data-state={copied ? 'copied' : active ? 'active' : 'idle'}
        {...props}
      >
        <span
          className={cn(
            'transition-transform duration-200',
            copied ? 'scale-110' : 'scale-100',
          )}
        >
          {copied ? (
            <CopiedIcon
              className="size-5 shrink-0"
              stroke="#999999"
              strokeWidth={2}
            />
          ) : (
            <Icon className="size-5 shrink-0" stroke="#999999" strokeWidth={2} />
          )}
        </span>
        <span className="sr-only">{copied ? '已复制' : '复制'}</span>
      </Button>
    )
  },
)
CopyButton.displayName = 'CopyButton'

export { CopyButton }
