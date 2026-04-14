'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { XIcon, ZoomInIcon } from 'lucide-react'
import { cn } from '../lib/utils'

const imageVariants = cva(
  'overflow-hidden',
  {
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
  },
)

export interface FluxImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'>,
    VariantProps<typeof imageVariants> {
  preview?: boolean
  width?: number | string
  height?: number | string
  fallback?: React.ReactNode
}

const FluxImage = React.forwardRef<HTMLDivElement, FluxImageProps>(
  (
    {
      src,
      alt,
      preview = false,
      variant,
      shape,
      width,
      height,
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

    React.useEffect(() => {
      if (showPreview) {
        document.body.style.overflow = 'hidden'
        closeBtnRef.current?.focus()
        return () => { document.body.style.overflow = '' }
      }
    }, [showPreview])

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && showPreview) setShowPreview(false)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [showPreview])

    if (hasError) {
      if (fallback) return <>{fallback}</>
      return (
        <div
          ref={ref}
          className={cn(imageVariants({ variant, shape }), 'flex items-center justify-center text-sm text-muted-foreground', className)}
          style={{ width, height, minHeight: height || 120 }}
        >
          Image loading failed
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
          style={{ width, height }}
        >
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}
          <img
            src={src}
            alt={alt}
            className={cn(
              'h-full w-full object-cover transition-opacity',
              loaded ? 'opacity-100' : 'opacity-0',
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setHasError(true)}
            {...props}
          />
          {preview && loaded && (
            <button
              type="button"
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 transition-all hover:bg-black/20 active:bg-black/30 sm:opacity-0 sm:hover:opacity-100 sm:focus:opacity-100"
              onClick={() => setShowPreview(true)}
              aria-label="Preview image"
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
            aria-label="Preview image"
            onClick={() => setShowPreview(false)}
          >
            <button
              ref={closeBtnRef}
              type="button"
              className="absolute right-[max(1rem,var(--safe-area-right,0px))] top-[max(1rem,var(--safe-area-top,0px))] z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 active:bg-white/30"
              onClick={() => setShowPreview(false)}
              aria-label="Close preview"
            >
              <XIcon className="h-5 w-5" />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[calc(90vh-var(--safe-area-top,0px)-var(--safe-area-bottom,0px))] max-w-[calc(90vw-var(--safe-area-left,0px)-var(--safe-area-right,0px))] rounded-lg object-contain shadow-2xl"
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
