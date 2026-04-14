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
        className={cn(videoVariants({ variant }), className)}
        style={{ width, height, maxWidth, maxHeight }}
      >
        {preview && !isPlaying && !hasError && (
          <button
            type="button"
            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/20 transition-opacity hover:bg-black/30 active:bg-black/40"
            onClick={handlePlayClick}
            aria-label="播放视频"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform hover:scale-110 active:scale-95">
              <PlayIcon className="ml-0.5 h-5 w-5" />
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
