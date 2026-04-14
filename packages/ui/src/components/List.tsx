'use client'

import * as React from 'react'
import { cn } from '../lib/utils'

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  avatar?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  addon?: React.ReactNode
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
      disabled,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role={onClick ? 'button' : 'listitem'}
        tabIndex={onClick && !disabled ? 0 : undefined}
        aria-current={active ? 'true' : undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
          onClick && !disabled && 'cursor-pointer hover:bg-accent active:bg-accent/80',
          active && 'bg-accent',
          disabled && 'pointer-events-none opacity-50',
          className,
        )}
        onClick={disabled ? undefined : onClick}
        onKeyDown={
          onClick && !disabled
            ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as any) } }
            : undefined
        }
        {...props}
      >
        {avatar && <div className="shrink-0">{avatar}</div>}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium leading-tight">{title}</div>
          {description && (
            <div className="mt-0.5 truncate text-xs text-muted-foreground">{description}</div>
          )}
        </div>
        {addon && <div className="shrink-0 text-xs text-muted-foreground">{addon}</div>}
        {actions && (
          <div className="shrink-0 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            {actions}
          </div>
        )}
      </div>
    )
  },
)
ListItem.displayName = 'ListItem'

export interface ListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  items: (ListItemProps & { key: string })[]
  activeKey?: string
  onItemClick?: (key: string, item: ListItemProps) => void
  emptyText?: React.ReactNode
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ items, activeKey, onItemClick, emptyText, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-1 p-1', className)} role="list" {...props}>
        {items.length === 0 && emptyText && (
          <div className="px-3 py-8 text-center text-sm text-muted-foreground">{emptyText}</div>
        )}
        {items.map(({ key, onClick: itemOnClick, ...itemProps }) => (
          <ListItem
            key={key}
            role="listitem"
            active={key === activeKey}
            onClick={(e) => {
              itemOnClick?.(e)
              onItemClick?.(key, itemProps as ListItemProps)
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
