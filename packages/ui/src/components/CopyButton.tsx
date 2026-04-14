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
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      content,
      icon: Icon = CopyIcon,
      copiedIcon: CopiedIcon = CheckIcon,
      copiedDuration = 2000,
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
      return () => { clearTimeout(timerRef.current) }
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
        variant={variant}
        size={size}
        className={cn(
          'relative transition-colors',
          copied && 'text-green-500',
          className,
        )}
        onClick={handleCopy}
        aria-label={copied ? '已复制' : '复制'}
        {...props}
      >
        <span className={cn('transition-transform', copied ? 'scale-110' : 'scale-100')}>
          {copied ? <CopiedIcon className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
        </span>
        <span className="sr-only">{copied ? '已复制' : '复制'}</span>
      </Button>
    )
  },
)
CopyButton.displayName = 'CopyButton'

export { CopyButton }
