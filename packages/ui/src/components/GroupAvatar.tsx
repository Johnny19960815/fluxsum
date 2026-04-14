'use client'

import * as React from 'react'
import { cn } from '../lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'

export interface GroupAvatarItem {
  src?: string
  alt?: string
  fallback?: string
}

export interface GroupAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: (string | GroupAvatarItem)[]
  size?: number
  maxCount?: number
  shape?: 'circle' | 'square'
}

const GroupAvatar = React.forwardRef<HTMLDivElement, GroupAvatarProps>(
  (
    {
      avatars = [],
      size = 40,
      maxCount,
      shape = 'circle',
      className,
      ...props
    },
    ref,
  ) => {
    const displayAvatars = maxCount ? avatars.slice(0, maxCount) : avatars
    const overflow = maxCount && avatars.length > maxCount ? avatars.length - maxCount : 0

    return (
      <div
        ref={ref}
        className={cn('flex max-w-full items-center -space-x-2 overflow-hidden', className)}
        {...props}
      >
        {displayAvatars.map((item, index) => {
          const avatar = typeof item === 'string' ? { src: item } : item
          const avatarSize = size
          return (
            <Avatar
              key={index}
              className={cn(
                'border-2 border-background',
                shape === 'square' ? 'rounded-md' : 'rounded-full',
              )}
              style={{ width: avatarSize, height: avatarSize }}
            >
              {avatar.src && <AvatarImage src={avatar.src} alt={avatar.alt} />}
              <AvatarFallback className={shape === 'square' ? 'rounded-md' : 'rounded-full'}>
                {avatar.fallback || avatar.alt?.charAt(0)?.toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
          )
        })}
        {overflow > 0 && (
          <div
            className={cn(
              'flex items-center justify-center border-2 border-background bg-muted text-xs font-medium text-muted-foreground',
              shape === 'square' ? 'rounded-md' : 'rounded-full',
            )}
            style={{ width: size, height: size }}
          >
            +{overflow}
          </div>
        )}
      </div>
    )
  },
)
GroupAvatar.displayName = 'GroupAvatar'

export { GroupAvatar }
