"use client";

import * as React from "react";
import { Loader2, Search, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Input, type InputProps } from "../input/input";

export interface SearchBarProps
  extends Omit<InputProps, "prefix" | "suffix" | "leftAddon" | "rightAddon" | "type"> {
  loading?: boolean;
  onSearch?: (value: string) => void;
  onInputChange?: (value: string) => void;
  enableShortKey?: boolean;
  shortKey?: string;
  spotlight?: boolean;
  defaultValue?: string;
  classNames?: {
    input?: string;
    shortKey?: string;
  };
  styles?: {
    input?: React.CSSProperties;
    shortKey?: React.CSSProperties;
  };
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      loading = false,
      onSearch,
      onInputChange,
      enableShortKey,
      shortKey = "mod+k",
      placeholder = "Search...",
      defaultValue = "",
      value: valueProp,
      onChange,
      onKeyDown,
      allowClear,
      classNames,
      styles,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      valueProp ?? defaultValue
    );
    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!isControlled) setInternalValue(val);
      onChange?.(e);
      onInputChange?.(val);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(currentValue as string);
      }
      onKeyDown?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue("");
      onInputChange?.("");
    };

    const formatShortKey = (key: string) => {
      return key
        .replace("mod", "⌘")
        .replace("ctrl", "Ctrl")
        .replace("shift", "⇧")
        .replace("alt", "⌥")
        .split("+")
        .join(" ");
    };

    const showShortKeyBadge =
      enableShortKey && shortKey && !currentValue;

    return (
      <div className={cn("relative", className)}>
        <Input
          ref={ref}
          type="search"
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn("pr-20", classNames?.input)}
          style={styles?.input}
          prefix={
            loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Search className="h-4 w-4 text-muted-foreground" />
            )
          }
          suffix={
            currentValue ? (
              <button
                type="button"
                tabIndex={-1}
                className="h-4 w-4 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                onClick={handleClear}
              >
                <X className="h-3 w-3" />
              </button>
            ) : undefined
          }
          {...props}
        />
        {showShortKeyBadge && (
          <span
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
              "flex items-center gap-0.5",
              classNames?.shortKey
            )}
            style={styles?.shortKey}
          >
            {shortKey
              .replace("mod", "⌘")
              .replace("ctrl", "Ctrl")
              .split("+")
              .map((k, i) => (
                <kbd
                  key={i}
                  className="inline-flex items-center justify-center rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-medium text-muted-foreground"
                >
                  {k === "⌘" ? "⌘" : k.toUpperCase()}
                </kbd>
              ))}
          </span>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
