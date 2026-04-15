'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { PlayIcon } from 'lucide-react'
import { cn } from '../lib/utils'

const videoVariants = cva(
  'relative overflow-hidden rounded-lg',
  {
    variants: {
      variant: {
        filled: 'bg-muted',
        outlined: 'border border-border',
        borderless: '',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  },
)

export interface VideoProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'width' | 'height'>,
    VariantProps<typeof videoVariants> {
  src: string
  poster?: string
  preview?: boolean
  width?: number | string
  height?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
}

const Video = React.forwardRef<HTMLDivElement, VideoProps>(
  (
    {
      src,
      poster,
      preview = true,
      variant,
      width,
      height,
      maxWidth = '100%',
      maxHeight = '100%',
      className,
      autoPlay,
      ...props
    },
    ref,
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)

    const handlePlayClick = React.useCallback(() => {
      videoRef.current?.play()
    }, [])

    return (
      <div
        ref={ref}
        className={cn('group relative', videoVariants({ variant }), className)}
        style={{ width, height, maxWidth, maxHeight }}
      >
        {preview && !isPlaying && !hasError && (
          <button
            type="button"
            className={cn(
              'absolute inset-0 z-10 flex cursor-pointer items-center justify-center',
              'bg-gradient-to-b from-black/30 via-black/10 to-black/45',
              'transition-[background] duration-300 ease-out',
              'hover:from-black/35 hover:via-black/15 hover:to-black/50',
              'active:from-black/40 active:via-black/20 active:to-black/55',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            )}
            onClick={handlePlayClick}
            aria-label="播放视频"
          >
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.12)_0%,transparent_65%)]" />
            <div
              className={cn(
                'relative flex h-14 w-14 items-center justify-center rounded-full',
                'bg-background/95 text-primary shadow-lg ring-1 ring-border/60',
                'backdrop-blur-sm transition-transform duration-200 ease-out',
                'group-hover:scale-105 group-active:scale-95',
              )}
            >
              <PlayIcon className="ml-0.5 h-6 w-6 text-primary drop-shadow-sm" />
            </div>
          </button>
        )}
        {hasError && (
          <div className="flex h-full min-h-[120px] items-center justify-center text-sm text-muted-foreground">
            视频加载失败
          </div>
        )}
        <video
          ref={videoRef}
          controls={isPlaying}
          autoPlay={autoPlay}
          className="h-auto w-full"
          style={{ maxWidth: '100%' }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={() => setHasError(true)}
          poster={poster}
          {...props}
        >
          <source src={src} />
        </video>
      </div>
    )
  },
)
Video.displayName = 'Video'

export { Video, videoVariants }
