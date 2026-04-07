"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Textarea 变体样式定义
 */
const textareaVariants = cva(
  [
    "flex w-full rounded-md border bg-background px-3 py-2",
    "text-sm placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "transition-colors duration-200",
    "resize-none",
  ],
  {
    variants: {
      /** 文本域变体 */
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted",
        ghost: "border-transparent hover:bg-accent",
        underline:
          "rounded-none border-0 border-b-2 border-input px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary",
      },
      /** 文本域尺寸 */
      textareaSize: {
        sm: "min-h-[60px] text-xs",
        default: "min-h-[80px]",
        lg: "min-h-[120px] text-base",
      },
      /** 是否有错误 */
      error: {
        true: "border-destructive focus-visible:ring-destructive",
        false: "",
      },
      /** 是否可手动调整大小 */
      resizable: {
        true: "resize-y",
        false: "resize-none",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default",
      error: false,
      resizable: false,
    },
  }
);

/**
 * Textarea 组件属性
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /**
   * 错误提示信息
   */
  errorMessage?: string;
  /**
   * 帮助文本
   */
  helperText?: string;
  /**
   * 是否显示字数统计
   */
  showCount?: boolean;
  /**
   * 最大字数限制
   */
  maxLength?: number;
}

/**
 * Textarea 多行文本输入组件
 *
 * 支持多种变体、尺寸、字数统计和验证状态。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Textarea placeholder="Enter your message..." />
 *
 * // 带字数统计
 * <Textarea maxLength={200} showCount placeholder="Max 200 characters" />
 *
 * // 错误状态
 * <Textarea error errorMessage="This field is required" />
 *
 * // 可调整大小
 * <Textarea resizable />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      textareaSize,
      error,
      resizable,
      errorMessage,
      helperText,
      showCount,
      maxLength,
      disabled,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(
      () => (value ?? defaultValue ?? "").toString().length
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        onChange?.(e);
      },
      [onChange]
    );

    const isOverLimit = maxLength !== undefined && charCount > maxLength;
    const hasError = error || isOverLimit;

    return (
      <div className="w-full space-y-1.5">
        <textarea
          className={cn(
            textareaVariants({
              variant,
              textareaSize,
              error: hasError ? true : false,
              resizable,
            }),
            className
          )}
          ref={ref}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={
            errorMessage
              ? "textarea-error"
              : helperText
              ? "textarea-helper"
              : undefined
          }
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...props}
        />
        <div className="flex items-center justify-between">
          <div>
            {errorMessage && (
              <p id="textarea-error" className="text-xs text-destructive">
                {errorMessage}
              </p>
            )}
            {helperText && !errorMessage && (
              <p id="textarea-helper" className="text-xs text-muted-foreground">
                {helperText}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <p
              className={cn(
                "text-xs text-muted-foreground tabular-nums",
                isOverLimit && "text-destructive"
              )}
            >
              {charCount} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
