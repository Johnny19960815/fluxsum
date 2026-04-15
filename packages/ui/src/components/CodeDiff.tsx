'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const codeDiffVariants = cva(
  'overflow-hidden rounded-lg font-mono text-sm',
  {
    variants: {
      variant: {
        filled: 'bg-muted',
        outlined: 'border border-border bg-background',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  },
)

type DiffLine = {
  type: 'added' | 'removed' | 'unchanged'
  content: string
  lineNumber: { old?: number; new?: number }
}

function computeDiff(oldContent: string, newContent: string): DiffLine[] {
  const oldLines = oldContent.split('\n')
  const newLines = newContent.split('\n')
  const result: DiffLine[] = []

  const oldSet = new Set(oldLines)
  const newSet = new Set(newLines)

  let oi = 0
  let ni = 0

  while (oi < oldLines.length || ni < newLines.length) {
    if (
      oi < oldLines.length &&
      ni < newLines.length &&
      oldLines[oi] === newLines[ni]
    ) {
      result.push({
        type: 'unchanged',
        content: oldLines[oi],
        lineNumber: { old: oi + 1, new: ni + 1 },
      })
      oi++
      ni++
    } else if (oi < oldLines.length && !newSet.has(oldLines[oi])) {
      result.push({
        type: 'removed',
        content: oldLines[oi],
        lineNumber: { old: oi + 1 },
      })
      oi++
    } else if (ni < newLines.length && !oldSet.has(newLines[ni])) {
      result.push({
        type: 'added',
        content: newLines[ni],
        lineNumber: { new: ni + 1 },
      })
      ni++
    } else if (oi < oldLines.length) {
      result.push({
        type: 'removed',
        content: oldLines[oi],
        lineNumber: { old: oi + 1 },
      })
      oi++
    } else {
      result.push({
        type: 'added',
        content: newLines[ni],
        lineNumber: { new: ni + 1 },
      })
      ni++
    }
  }

  return result
}

type SplitRow = {
  left: DiffLine | null
  right: DiffLine | null
}

function toSplitRows(diff: DiffLine[]): SplitRow[] {
  const rows: SplitRow[] = []
  let i = 0
  while (i < diff.length) {
    const line = diff[i]
    if (line.type === 'unchanged') {
      rows.push({ left: line, right: line })
      i++
    } else if (line.type === 'removed') {
      const next = diff[i + 1]
      if (next && next.type === 'added') {
        rows.push({ left: line, right: next })
        i += 2
      } else {
        rows.push({ left: line, right: null })
        i++
      }
    } else {
      rows.push({ left: null, right: line })
      i++
    }
  }
  return rows
}

export type CodeDiffViewMode = 'split' | 'unified'

export interface CodeDiffProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeDiffVariants> {
  oldContent: string
  newContent: string
  language?: string
  fileName?: string
  viewMode?: CodeDiffViewMode
  showHeader?: boolean
}

const CodeDiff = React.forwardRef<HTMLDivElement, CodeDiffProps>(
  (
    {
      oldContent,
      newContent,
      language,
      fileName,
      viewMode = 'unified',
      showHeader = true,
      variant,
      className,
      ...props
    },
    ref,
  ) => {
    const diff = React.useMemo(
      () => computeDiff(oldContent, newContent),
      [oldContent, newContent],
    )

    const stats = React.useMemo(() => {
      let additions = 0
      let deletions = 0
      for (const line of diff) {
        if (line.type === 'added') additions++
        if (line.type === 'removed') deletions++
      }
      return { additions, deletions }
    }, [diff])

    const splitRows = React.useMemo(
      () => (viewMode === 'split' ? toSplitRows(diff) : []),
      [diff, viewMode],
    )

    return (
      <div
        ref={ref}
        className={cn(codeDiffVariants({ variant }), className)}
        {...props}
      >
        {showHeader && (
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
              {fileName || language || 'diff'}
            </span>
            <div className="flex gap-2 text-xs">
              {stats.additions > 0 && (
                <span className="text-green-600 dark:text-green-400">
                  +{stats.additions}
                </span>
              )}
              {stats.deletions > 0 && (
                <span className="text-red-600 dark:text-red-400">
                  -{stats.deletions}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          {viewMode === 'unified' ? (
            <table className="w-full border-collapse">
              <tbody>
                {diff.map((line, i) => (
                  <tr
                    key={i}
                    className={cn(
                      line.type === 'added' && 'bg-green-500/10',
                      line.type === 'removed' && 'bg-red-500/10',
                    )}
                  >
                    <td className="w-10 select-none px-2 text-right text-xs text-muted-foreground/50">
                      {line.lineNumber.old ?? ''}
                    </td>
                    <td className="w-10 select-none px-2 text-right text-xs text-muted-foreground/50">
                      {line.lineNumber.new ?? ''}
                    </td>
                    <td className="w-5 select-none text-center text-xs">
                      {line.type === 'added' && (
                        <span className="text-green-600 dark:text-green-400">
                          +
                        </span>
                      )}
                      {line.type === 'removed' && (
                        <span className="text-red-600 dark:text-red-400">
                          −
                        </span>
                      )}
                    </td>
                    <td className="whitespace-pre px-3 py-0.5">
                      {line.content}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full border-collapse">
              <tbody>
                {splitRows.map((row, i) => (
                  <tr key={i}>
                    {/* Left (old) */}
                    <td className="w-10 select-none border-r border-border/40 px-2 text-right text-xs text-muted-foreground/50">
                      {row.left?.lineNumber.old ?? ''}
                    </td>
                    <td className="w-5 select-none border-r border-border/40 text-center text-xs">
                      {row.left?.type === 'removed' && (
                        <span className="text-red-600 dark:text-red-400">
                          −
                        </span>
                      )}
                    </td>
                    <td
                      className={cn(
                        'w-1/2 whitespace-pre border-r border-border/40 px-3 py-0.5',
                        row.left?.type === 'removed' && 'bg-red-500/10',
                      )}
                    >
                      {row.left?.content ?? ''}
                    </td>
                    {/* Right (new) */}
                    <td className="w-10 select-none border-r border-border/40 px-2 text-right text-xs text-muted-foreground/50">
                      {row.right?.lineNumber.new ?? ''}
                    </td>
                    <td className="w-5 select-none border-r border-border/40 text-center text-xs">
                      {row.right?.type === 'added' && (
                        <span className="text-green-600 dark:text-green-400">
                          +
                        </span>
                      )}
                    </td>
                    <td
                      className={cn(
                        'w-1/2 whitespace-pre px-3 py-0.5',
                        row.right?.type === 'added' && 'bg-green-500/10',
                      )}
                    >
                      {row.right?.content ?? ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  },
)
CodeDiff.displayName = 'CodeDiff'

export { CodeDiff, codeDiffVariants }
