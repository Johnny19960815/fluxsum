'use client'

import * as React from 'react'
import { cn } from '../lib/utils'
import { Label } from './Label'

function Field({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('group/field flex w-full flex-col gap-2', className)} {...props} />
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label className={cn('group-data-[disabled=true]/field:opacity-50', className)} {...props} />
}

function FieldDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

function FieldError({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  if (!children) return null
  return <div role="alert" className={cn('text-sm font-normal text-destructive', className)} {...props}>{children}</div>
}

export { Field, FieldLabel, FieldDescription, FieldError }
