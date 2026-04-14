'use client'

import * as React from 'react'
import { AlertCircleIcon, DownloadIcon, LoaderIcon, type LucideIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button, type ButtonProps } from './Button'

export type DownloadState = 'idle' | 'loading' | 'error'

export interface DownloadButtonProps extends Omit<ButtonProps, 'children'> {
  url?: string
  fileName?: string
  fileType?: string
  icon?: LucideIcon
  onDownloadError?: (error: Error) => void
}

const DownloadButton = React.forwardRef<HTMLButtonElement, DownloadButtonProps>(
  (
    {
      url,
      fileName = 'download',
      fileType,
      icon: Icon = DownloadIcon,
      className,
      variant = 'ghost',
      size = 'icon',
      disabled,
      onClick,
      onDownloadError,
      ...props
    },
    ref,
  ) => {
    const [state, setState] = React.useState<DownloadState>('idle')

    const handleDownload = React.useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!url || disabled || state === 'loading') return
        setState('loading')
        try {
          const response = await fetch(url)
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          const blob = await response.blob()
          const blobUrl = URL.createObjectURL(blob)
          const a = document.createElement('a')
          const ext = fileType ? `.${fileType}` : ''
          a.href = blobUrl
          a.download = fileName.replace(/\.[^./]+$/, '') + ext
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(blobUrl)
          setState('idle')
        } catch (error) {
          setState('error')
          onDownloadError?.(error instanceof Error ? error : new Error(String(error)))
          setTimeout(() => setState('idle'), 3000)
        }
        onClick?.(e)
      },
      [url, fileName, fileType, disabled, onClick, onDownloadError, state],
    )

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'relative transition-colors',
          state === 'error' && 'text-destructive',
          className,
        )}
        disabled={disabled || !url || state === 'loading'}
        onClick={handleDownload}
        aria-label={
          state === 'loading' ? 'Downloading...' : state === 'error' ? 'Download failed' : 'Download'
        }
        {...props}
      >
        {state === 'loading' ? (
          <LoaderIcon className="h-4 w-4 animate-spin" />
        ) : state === 'error' ? (
          <AlertCircleIcon className="h-4 w-4" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
        <span className="sr-only">
          {state === 'loading' ? 'Downloading...' : state === 'error' ? 'Download failed' : 'Download'}
          {fileType ? ` ${fileType.toUpperCase()}` : ''}
        </span>
      </Button>
    )
  },
)
DownloadButton.displayName = 'DownloadButton'

export { DownloadButton }
