import * as React from 'react'
import { cn } from '../lib/utils'

function ButtonGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      className={cn('flex w-fit items-stretch [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none', className)}
      {...props}
    />
  )
}

export { ButtonGroup }
