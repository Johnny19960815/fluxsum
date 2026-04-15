"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/** 与 nav 指示条视觉对齐：对应原 `inset-x-2`（0.5rem） */
const NAV_INDICATOR_INSET_X = 8

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none data-[variant=nav]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
        nav: "relative gap-1 overflow-visible bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function useNavIndicator(
  listRef: React.RefObject<HTMLDivElement | null>,
  variant: "default" | "line" | "nav"
) {
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 })

  React.useLayoutEffect(() => {
    if (variant !== "nav") return
    const list = listRef.current
    if (!list) return

    const update = () => {
      const root = list.closest("[data-orientation]")
      const orientation = root?.getAttribute("data-orientation") ?? "horizontal"
      if (orientation !== "horizontal") {
        setIndicator({ left: 0, width: 0 })
        return
      }
      const active = list.querySelector(
        '[data-state="active"]'
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
      attributeFilter: ["data-state"],
    })

    window.addEventListener("resize", update)
    list.addEventListener("scroll", update, { passive: true })

    return () => {
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener("resize", update)
      list.removeEventListener("scroll", update)
    }
  }, [variant, listRef])

  return indicator
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, variant = "default", children, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const v = variant ?? "default"

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
    },
    [ref]
  )

  const indicator = useNavIndicator(listRef, v)

  return (
    <TabsPrimitive.List
      ref={setRefs}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
      {v === "nav" && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-0 z-1 h-[3px]",
            "rounded-ss-[3px] rounded-se-[3px] bg-primary",
            "transition-[left,width] duration-300 ease-in-out"
          )}
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />
      )}
    </TabsPrimitive.List>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "group-data-[variant=nav]/tabs-list:h-auto group-data-[variant=nav]/tabs-list:flex-none group-data-[variant=nav]/tabs-list:rounded-md group-data-[variant=nav]/tabs-list:px-3 group-data-[variant=nav]/tabs-list:py-2 group-data-[variant=nav]/tabs-list:text-muted-foreground group-data-[variant=nav]/tabs-list:hover:bg-muted group-data-[variant=nav]/tabs-list:hover:text-foreground group-data-[variant=nav]/tabs-list:data-[state=active]:bg-transparent group-data-[variant=nav]/tabs-list:data-[state=active]:text-foreground group-data-[variant=nav]/tabs-list:data-[state=active]:shadow-none group-data-[variant=nav]/tabs-list:data-[state=active]:hover:bg-transparent dark:group-data-[variant=nav]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=nav]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-[opacity,border-radius] after:duration-200 after:ease-out group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-[3px] group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs:after:rounded-ss-[3px] group-data-[variant=line]/tabs-list:group-data-[orientation=horizontal]/tabs:after:rounded-se-[3px] group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        "group-data-[variant=nav]/tabs-list:after:hidden",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
