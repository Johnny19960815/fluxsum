'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { XIcon, ZoomInIcon } from 'lucide-react'
import { closeIconButtonClassName } from '../lib/close-button'
import { cn } from '../lib/utils'

const imageVariants = cva('overflow-hidden', {
  variants: {
    variant: {
      filled: 'rounded-lg bg-muted',
      outlined: 'rounded-lg border border-border',
      borderless: '',
    },
    shape: {
      square: 'rounded-lg',
      rounded: 'rounded-2xl',
      circle: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'filled',
    shape: 'square',
  },
})

export interface FluxImageProps
  extends Omit<
      React.ImgHTMLAttributes<HTMLImageElement>,
      'width' | 'height'
    >,
    VariantProps<typeof imageVariants> {
  preview?: boolean
  isLoading?: boolean
  width?: number | string
  height?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
  minWidth?: number | string
  minHeight?: number | string
  objectFit?: React.CSSProperties['objectFit']
  actions?: React.ReactNode
  alwaysShowActions?: boolean
  fallback?: React.ReactNode
}

const FluxImage = React.forwardRef<HTMLDivElement, FluxImageProps>(
  (
    {
      src,
      alt,
      preview = false,
      isLoading,
      variant,
      shape,
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      objectFit = 'cover',
      actions,
      alwaysShowActions,
      className,
      fallback,
      ...props
    },
    ref,
  ) => {
    const [showPreview, setShowPreview] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)
    const [loaded, setLoaded] = React.useState(false)
    const closeBtnRef = React.useRef<HTMLButtonElement>(null)

    const showSkeleton = isLoading ?? !loaded

    React.useEffect(() => {
      setHasError(false)
      setLoaded(false)
    }, [src])

    React.useEffect(() => {
      if (!showPreview) return
      document.body.style.overflow = 'hidden'
      closeBtnRef.current?.focus()
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowPreview(false)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    }, [showPreview])

    const containerStyle: React.CSSProperties = {
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
    }

    if (hasError) {
      if (fallback) return <>{fallback}</>
      return (
        <div
          ref={ref}
          className={cn(
            imageVariants({ variant, shape }),
            'flex items-center justify-center text-sm text-muted-foreground',
            className,
          )}
          style={{ ...containerStyle, minHeight: minHeight || height || 120 }}
        >
          图片加载失败
        </div>
      )
    }

    return (
      <>
        <div
          ref={ref}
          className={cn(
            imageVariants({ variant, shape }),
            'group relative inline-block',
            className,
          )}
          style={containerStyle}
        >
          {showSkeleton && (
            <div className="absolute inset-0 animate-pulse rounded-[inherit] bg-muted" />
          )}

          {!isLoading && (
            <img
              src={src}
              alt={alt}
              style={{ objectFit }}
              className={cn(
                'h-full w-full transition-opacity',
                loaded ? 'opacity-100' : 'opacity-0',
              )}
              onLoad={() => setLoaded(true)}
              onError={() => setHasError(true)}
              {...props}
            />
          )}

          {actions && (
            <div
              className={cn(
                'absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 p-2 transition-opacity',
                !alwaysShowActions &&
                  'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100',
              )}
            >
              {actions}
            </div>
          )}

          {preview && loaded && !isLoading && (
            <button
              type="button"
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 touch-manipulation transition-all hover:bg-black/20 active:bg-black/30 sm:opacity-0 sm:hover:opacity-100 sm:focus:opacity-100"
              onClick={() => setShowPreview(true)}
              aria-label="预览图片"
            >
              <ZoomInIcon className="h-6 w-6 text-white drop-shadow-lg" />
            </button>
          )}
        </div>

        {showPreview && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="预览图片"
            onClick={() => setShowPreview(false)}
          >
            <button
              ref={closeBtnRef}
              type="button"
              className={cn(
                'absolute z-10 touch-manipulation',
                'right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))]',
                closeIconButtonClassName,
              )}
              onClick={() => setShowPreview(false)}
              aria-label="关闭预览"
            >
              <XIcon className="h-4 w-4" />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </>
    )
  },
)
FluxImage.displayName = 'FluxImage'

export { FluxImage, imageVariants }
