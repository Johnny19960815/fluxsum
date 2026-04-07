"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Input 变体样式定义
 */
const inputVariants = cva(
  [
    "flex w-full rounded-md border bg-background px-3 py-2",
    "text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "transition-colors duration-200",
  ],
  {
    variants: {
      /** 输入框变体 */
      variant: {
        /** 默认带边框 */
        default: "border-input",
        /** 填充样式 */
        filled: "border-transparent bg-muted",
        /** 无边框 */
        ghost: "border-transparent hover:bg-accent",
        /** 下划线样式 */
        underline: "rounded-none border-0 border-b-2 border-input px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary",
      },
      /** 输入框尺寸 */
      inputSize: {
        sm: "h-8 text-xs",
        default: "h-10",
        lg: "h-12 text-base",
      },
      /** 是否有错误 */
      error: {
        true: "border-destructive focus-visible:ring-destructive",
        false: "",
      },
      /** 是否有成功状态 */
      success: {
        true: "border-success focus-visible:ring-success",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      error: false,
      success: false,
    },
  }
);

/**
 * Input 组件属性
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * 左侧装饰元素（图标等）
   */
  leftAddon?: React.ReactNode;
  /**
   * 右侧装饰元素（图标、按钮等）
   */
  rightAddon?: React.ReactNode;
  /**
   * 错误提示信息
   */
  errorMessage?: string;
  /**
   * 帮助文本
   */
  helperText?: string;
}

/**
 * Input 输入框组件
 *
 * 一个功能丰富的输入框组件，支持多种变体、尺寸和状态。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Input placeholder="Enter your name" />
 *
 * // 带图标
 * <Input leftAddon={<SearchIcon />} placeholder="Search..." />
 *
 * // 错误状态
 * <Input error errorMessage="This field is required" />
 *
 * // 不同变体
 * <Input variant="filled" placeholder="Filled input" />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant,
      inputSize,
      error,
      success,
      leftAddon,
      rightAddon,
      errorMessage,
      helperText,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasAddon = leftAddon || rightAddon;

    const inputElement = (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, inputSize, error, success }),
          hasAddon && "peer",
          leftAddon && "pl-10",
          rightAddon && "pr-10",
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          errorMessage ? "input-error" : helperText ? "input-helper" : undefined
        }
        {...props}
      />
    );

    if (!hasAddon && !errorMessage && !helperText) {
      return inputElement;
    }

    return (
      <div className="w-full space-y-1.5">
        <div className="relative">
          {leftAddon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground transition-colors">
              {leftAddon}
            </div>
          )}
          {inputElement}
          {rightAddon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightAddon}
            </div>
          )}
        </div>
        {errorMessage && (
          <p id="input-error" className="text-xs text-destructive">
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p id="input-helper" className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
