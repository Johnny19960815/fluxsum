'use client'

import * as React from 'react'
import { cn } from '../lib/utils'

function InputGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      className={cn(
        'group/input-group relative flex w-full items-center rounded-md border border-input shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2',
        className,
      )}
      {...props}
    />
  )
}

export { InputGroup }
