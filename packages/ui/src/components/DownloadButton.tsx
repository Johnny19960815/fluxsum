'use client'

import * as React from 'react'
import { DownloadIcon, type LucideIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button, type ButtonProps } from './Button'

export interface DownloadButtonProps extends Omit<ButtonProps, 'children'> {
  blobUrl?: string
  fileName?: string
  fileType?: string
  icon?: LucideIcon
}

const DownloadButton = React.forwardRef<HTMLButtonElement, DownloadButtonProps>(
  (
    {
      blobUrl,
      fileName = 'download',
      fileType,
      icon: Icon = DownloadIcon,
      className,
      variant = 'ghost',
      size = 'icon',
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleDownload = React.useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!blobUrl || disabled) return
        try {
          const response = await fetch(blobUrl)
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const blob = await response.blob()
          const objectUrl = URL.createObjectURL(blob)
          const a = document.createElement('a')
          const ext = fileType ? `.${fileType.replace(/^\./, '')}` : ''
          a.href = objectUrl
          a.download = fileName.replace(/\.[^./]+$/, '') + ext
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(objectUrl)
        } catch {
          // silently fail – matches lobe-ui simplicity
        }
        onClick?.(e)
      },
      [blobUrl, fileName, fileType, disabled, onClick],
    )

    return (
      <Button
        ref={ref}
        type="button"
        variant={variant}
        size={size}
        className={cn(
          'size-9 min-h-9 min-w-9 shrink-0 touch-manipulation transition-colors',
          className,
        )}
        disabled={disabled || !blobUrl}
        onClick={handleDownload}
        aria-label="下载"
        {...props}
      >
        <Icon className="size-5 shrink-0" stroke="#999999" strokeWidth={2} />
        <span className="sr-only">
          下载{fileType ? ` ${fileType.toUpperCase()}` : ''}
        </span>
      </Button>
    )
  },
)
DownloadButton.displayName = 'DownloadButton'

export { DownloadButton }
