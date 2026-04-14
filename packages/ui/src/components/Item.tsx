import * as React from 'react'
import { cn } from '../lib/utils'

function Item({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('group/item flex items-center gap-4 rounded-md p-4', className)} {...props} />
}

function ItemContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-1 flex-col gap-1', className)} {...props} />
}

function ItemTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm font-medium leading-snug', className)} {...props} />
}

function ItemDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export { Item, ItemContent, ItemTitle, ItemDescription }
