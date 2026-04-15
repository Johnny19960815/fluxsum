'use client'

import * as React from 'react'
import { Loader2Icon, PinIcon } from 'lucide-react'
import { cn } from '../lib/utils'

function formatRelativeTime(date: Date): string {
  const now = Date.now()
  const diff = now - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  if (hours < 24) return `${hours} 小时前`
  if (days === 1) return '昨天'
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  active?: boolean
  avatar?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  addon?: React.ReactNode
  date?: Date
  pin?: boolean
  loading?: boolean
  showAction?: boolean
  onHoverChange?: (hovering: boolean) => void
  disabled?: boolean
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      active,
      avatar,
      title,
      description,
      actions,
      addon,
      date,
      pin,
      loading,
      showAction,
      onHoverChange,
      disabled,
      className,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const handleMouseEnter = React.useCallback(() => {
      onHoverChange?.(true)
    }, [onHoverChange])

    const handleMouseLeave = React.useCallback(() => {
      onHoverChange?.(false)
    }, [onHoverChange])

    return (
      <div
        ref={ref}
        role={onClick ? 'button' : 'listitem'}
        tabIndex={onClick && !disabled ? 0 : undefined}
        aria-current={active ? 'true' : undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 touch-manipulation transition-colors',
          onClick && !disabled && 'cursor-pointer hover:bg-accent active:bg-accent/80',
          active && 'bg-accent',
          disabled && 'pointer-events-none opacity-50',
          '@media(pointer:coarse){min-h-[44px]}',
          className,
        )}
        onClick={disabled ? undefined : onClick}
        onKeyDown={
          onClick && !disabled
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick(e as unknown as React.MouseEvent<HTMLDivElement>)
                }
              }
            : undefined
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {pin && (
          <div className="absolute right-0 top-0 text-primary">
            <PinIcon className="h-3 w-3 translate-x-[-4px] translate-y-[4px] rotate-45" />
          </div>
        )}

        {loading ? (
          <div className="flex w-full items-center justify-center py-2">
            <Loader2Icon className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {avatar && <div className="shrink-0">{avatar}</div>}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium leading-tight">
                {title}
              </div>
              {description && (
                <div className="mt-0.5 truncate text-xs text-muted-foreground">
                  {description}
                </div>
              )}
              {addon && (
                <div className="mt-1 text-xs text-muted-foreground">
                  {addon}
                </div>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {date && (
                <span className="whitespace-nowrap text-[11px] text-muted-foreground/70">
                  {formatRelativeTime(date)}
                </span>
              )}
              {actions && (
                <div
                  className={cn(
                    'shrink-0 transition-opacity',
                    !showAction &&
                      'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100',
                  )}
                >
                  {actions}
                </div>
              )}
            </div>
            {children}
          </>
        )}
      </div>
    )
  },
)
ListItem.displayName = 'ListItem'

export interface ListItemType extends Omit<ListItemProps, 'key'> {
  key: string
}

export interface ListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  items: ListItemType[]
  activeKey?: string
  onClick?: (payload: { item: ListItemType; key: string }) => void
  onItemClick?: (key: string, item: ListItemType) => void
  emptyText?: React.ReactNode
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ items, activeKey, onClick, onItemClick, emptyText, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1 p-1', className)}
        role="list"
        {...props}
      >
        {items.length === 0 && emptyText && (
          <div className="px-3 py-8 text-center text-sm text-muted-foreground">
            {emptyText}
          </div>
        )}
        {items.map(({ key, onClick: itemOnClick, ...itemProps }) => (
          <ListItem
            key={key}
            role="listitem"
            active={key === activeKey}
            onClick={(e) => {
              itemOnClick?.(e)
              const fullItem = { key, ...itemProps } as ListItemType
              onClick?.({ item: fullItem, key })
              onItemClick?.(key, fullItem)
            }}
            {...itemProps}
          />
        ))}
      </div>
    )
  },
)
List.displayName = 'List'

export { List, ListItem }
