'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const TabsVariantContext = React.createContext<'default' | 'nav'>('default')

const Tabs = TabsPrimitive.Root

/** 与 nav 指示条视觉对齐：对应原 `inset-x-2`（0.5rem） */
const NAV_INDICATOR_INSET_X = 8

const tabsListVariants = cva(
  'inline-flex items-center justify-center text-muted-foreground',
  {
    variants: {
      variant: {
        default:
          'h-10 rounded-md bg-muted p-1 whitespace-nowrap',
        nav: 'relative h-auto gap-1 overflow-visible rounded-none bg-transparent p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const tabsTriggerVariants = cva(
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'rounded-sm px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        nav: [
          'relative rounded-md px-3 py-2 text-muted-foreground',
          'hover:bg-muted hover:text-foreground',
          'data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none',
          'data-[state=active]:hover:bg-transparent',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function useNavIndicator(
  listRef: React.RefObject<HTMLDivElement | null>,
  variant: 'default' | 'nav',
) {
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 })

  React.useLayoutEffect(() => {
    if (variant !== 'nav') return
    const list = listRef.current
    if (!list) return

    const update = () => {
      const root = list.closest('[data-orientation]')
      const orientation = root?.getAttribute('data-orientation') ?? 'horizontal'
      if (orientation !== 'horizontal') {
        setIndicator({ left: 0, width: 0 })
        return
      }
      const active = list.querySelector(
        '[data-state="active"]',
      ) as HTMLElement | null
      if (!active) {
        setIndicator({ left: 0, width: 0 })
        return
      }
      const listRect = list.getBoundingClientRect()
      const activeRect = active.getBoundingClientRect()
      const left =
        activeRect.left -
        listRect.left +
        list.scrollLeft +
        NAV_INDICATOR_INSET_X
      const width = Math.max(0, activeRect.width - NAV_INDICATOR_INSET_X * 2)
      setIndicator({ left, width })
    }

    update()

    const ro = new ResizeObserver(() => update())
    ro.observe(list)
    for (const child of list.children) {
      if (child instanceof HTMLElement) ro.observe(child)
    }

    const mo = new MutationObserver(update)
    mo.observe(list, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-state'],
    })

    window.addEventListener('resize', update)
    list.addEventListener('scroll', update, { passive: true })

    return () => {
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener('resize', update)
      list.removeEventListener('scroll', update)
    }
  }, [variant, listRef])

  return indicator
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, variant = 'default', children, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const v = variant ?? 'default'

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
    },
    [ref],
  )

  const indicator = useNavIndicator(listRef, v)

  return (
    <TabsVariantContext.Provider value={v}>
      <TabsPrimitive.List
        ref={setRefs}
        data-variant={variant}
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      >
        {children}
        {v === 'nav' && (
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute bottom-0 z-1 h-[3px]',
              'rounded-ss-[3px] rounded-se-[3px] bg-primary',
              'transition-[left,width] duration-300 ease-in-out',
            )}
            style={{
              left: indicator.left,
              width: indicator.width,
            }}
          />
        )}
      </TabsPrimitive.List>
    </TabsVariantContext.Provider>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    Partial<VariantProps<typeof tabsTriggerVariants>>
>(({ className, variant: variantProp, ...props }, ref) => {
  const ctxVariant = React.useContext(TabsVariantContext)
  const variant = variantProp ?? ctxVariant
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants }
