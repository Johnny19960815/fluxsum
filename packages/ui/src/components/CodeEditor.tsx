'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const codeEditorVariants = cva(
  'relative overflow-hidden rounded-lg font-mono text-sm',
  {
    variants: {
      variant: {
        filled: 'bg-muted',
        outlined: 'border border-border bg-background',
        borderless: '',
      },
    },
    defaultVariants: {
      variant: 'outlined',
    },
  },
)

export interface CodeEditorProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'defaultValue' | 'onChange'>,
    VariantProps<typeof codeEditorVariants> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  language?: string
  width?: number | string
  height?: number | string
}

const CodeEditor = React.forwardRef<HTMLTextAreaElement, CodeEditorProps>(
  (
    {
      value: controlledValue,
      defaultValue = '',
      onChange,
      language = 'text',
      variant,
      placeholder,
      width,
      height = 200,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = controlledValue ?? internalValue
    const preRef = React.useRef<HTMLPreElement>(null)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
      },
      [ref],
    )

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        if (controlledValue === undefined) {
          setInternalValue(newValue)
        }
        onChange?.(newValue)
      },
      [controlledValue, onChange],
    )

    const handleScroll = React.useCallback(() => {
      if (textareaRef.current && preRef.current) {
        preRef.current.scrollTop = textareaRef.current.scrollTop
        preRef.current.scrollLeft = textareaRef.current.scrollLeft
      }
    }, [])

    return (
      <div
        className={cn(codeEditorVariants({ variant }), 'w-full', className)}
        style={{ width, height }}
        data-language={language}
      >
        <pre
          ref={preRef}
          className="pointer-events-none absolute inset-0 overflow-hidden p-4"
          aria-hidden
        >
          <code className={`language-${language}`}>
            {value || <span className="text-muted-foreground">{placeholder || ' '}</span>}
          </code>
        </pre>
        <textarea
          ref={mergedRef}
          value={value}
          onChange={handleChange}
          onScroll={handleScroll}
          placeholder={placeholder}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className={cn(
            'absolute inset-0 resize-none bg-transparent p-4 text-transparent caret-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
            'placeholder:text-muted-foreground',
          )}
          style={{ touchAction: 'manipulation' }}
          {...props}
        />
      </div>
    )
  },
)
CodeEditor.displayName = 'CodeEditor'

export { CodeEditor, codeEditorVariants }
