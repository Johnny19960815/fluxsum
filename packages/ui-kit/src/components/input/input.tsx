"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";

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
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted",
        outlined: "border-input bg-background",
        ghost: "border-transparent hover:bg-accent",
        underline:
          "rounded-none border-0 border-b-2 border-input px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary",
      },
      inputSize: {
        sm: "h-8 text-xs",
        default: "h-9",
        middle: "h-9",
        large: "h-10 text-base",
        lg: "h-10 text-base",
      },
      error: {
        true: "border-destructive focus-visible:ring-destructive",
        false: "",
      },
      success: {
        true: "border-success focus-visible:ring-success",
        false: "",
      },
      shadow: {
        true: "shadow-sm",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      error: false,
      success: false,
      shadow: false,
    },
  }
);

/**
 * Input 组件属性
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    VariantProps<typeof inputVariants> {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  errorMessage?: string;
  helperText?: string;
  allowClear?: boolean;
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
      shadow,
      leftAddon,
      rightAddon,
      prefix,
      suffix,
      errorMessage,
      helperText,
      allowClear,
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value ?? "");
    const hasLeftDecor = leftAddon || prefix;
    const hasRightDecor = rightAddon || suffix || allowClear;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      setInternalValue("");
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      if (nativeInputValueSetter && ref && "current" in (ref as React.RefObject<HTMLInputElement>) && (ref as React.RefObject<HTMLInputElement>).current) {
        nativeInputValueSetter.call((ref as React.RefObject<HTMLInputElement>).current, "");
        (ref as React.RefObject<HTMLInputElement>).current?.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    const inputElement = (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, inputSize, error, success, shadow }),
          hasLeftDecor && "pl-9",
          hasRightDecor && "pr-9",
          className
        )}
        ref={ref}
        disabled={disabled}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          errorMessage ? "input-error" : helperText ? "input-helper" : undefined
        }
        {...props}
      />
    );

    const hasWrapper = hasLeftDecor || hasRightDecor || errorMessage || helperText;

    if (!hasWrapper) return inputElement;

    return (
      <div className="w-full space-y-1.5">
        <div className="relative flex items-center">
          {hasLeftDecor && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center">
              {prefix || leftAddon}
            </div>
          )}
          {inputElement}
          {hasRightDecor && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center gap-1">
              {allowClear && (internalValue || value) && (
                <button
                  type="button"
                  className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                  onClick={handleClear}
                  tabIndex={-1}
                >
                  <span className="sr-only">Clear</span>
                  <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.53 9.47-.53.53L8 8.53 4.97 11.5l-.47-.47L7.53 8 4.5 4.97l.47-.47L8 7.47 11.03 4.5l.47.47L8.47 8l3.06 3.03-.47.44z" />
                  </svg>
                </button>
              )}
              {suffix || rightAddon}
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

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    Pick<VariantProps<typeof inputVariants>, "variant" | "error" | "success" | "shadow"> {
  resize?: boolean;
  errorMessage?: string;
  helperText?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      variant,
      error,
      success,
      shadow,
      resize = false,
      errorMessage,
      helperText,
      style,
      ...props
    },
    ref
  ) => {
    const textarea = (
      <textarea
        ref={ref}
        className={cn(
          "flex w-full rounded-md border bg-background px-3 py-2",
          "text-sm placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-200 min-h-[80px]",
          variant === "filled" && "border-transparent bg-muted",
          variant === "outlined" && "border-input bg-background",
          variant === "ghost" && "border-transparent hover:bg-accent",
          !variant && "border-input",
          error && "border-destructive focus-visible:ring-destructive",
          success && "border-success focus-visible:ring-success",
          shadow && "shadow-sm",
          className
        )}
        style={{ resize: resize ? undefined : "none", ...style }}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />
    );

    if (!errorMessage && !helperText) return textarea;

    return (
      <div className="w-full space-y-1.5">
        {textarea}
        {errorMessage && (
          <p className="text-xs text-destructive">{errorMessage}</p>
        )}
        {helperText && !errorMessage && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export interface InputPasswordProps
  extends Omit<InputProps, "type" | "suffix" | "rightAddon"> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={className}
        suffix={
          <button
            type="button"
            tabIndex={-1}
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);
InputPassword.displayName = "InputPassword";

export { Input, TextArea, InputPassword, inputVariants };
