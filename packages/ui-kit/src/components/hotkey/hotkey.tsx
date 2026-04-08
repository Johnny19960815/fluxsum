"use client";

import * as React from "react";
import {
  ArrowBigUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowRightToLine,
  ArrowUp,
  ChevronUp,
  Command,
  CornerDownLeft,
  Space,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const kbdVariants = cva(
  [
    "inline-flex items-center justify-center rounded font-mono text-[0.75em] leading-none",
    "select-none",
  ],
  {
    variants: {
      variant: {
        filled: "border border-border bg-muted text-muted-foreground px-1.5 py-0.5 shadow-sm",
        outlined: "border border-border bg-transparent text-foreground px-1.5 py-0.5",
        borderless: "bg-transparent text-muted-foreground border-transparent px-0.5",
      },
      size: {
        sm: "text-[0.65em] min-w-[1.2em] min-h-[1.2em]",
        default: "text-[0.75em] min-w-[1.4em] min-h-[1.4em]",
        lg: "text-[0.85em] min-w-[1.6em] min-h-[1.6em]",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  }
);

function checkIsAppleDevice(isApple?: boolean): boolean {
  if (isApple !== undefined) return isApple;
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform ?? navigator.userAgent);
}

function splitKeysByPlus(keys: string | string[]): string[] {
  if (Array.isArray(keys)) return keys;
  return keys.split("+").map((k) => k.trim());
}

function startCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const KEY_MAP_ICONS: Record<string, (isApple: boolean) => React.ReactNode> = {
  meta: (isApple) => isApple ? <Command className="h-[0.9em] w-[0.9em]" /> : "Win",
  command: () => <Command className="h-[0.9em] w-[0.9em]" />,
  cmd: (isApple) => isApple ? <Command className="h-[0.9em] w-[0.9em]" /> : "Ctrl",
  mod: (isApple) => isApple ? <Command className="h-[0.9em] w-[0.9em]" /> : "Ctrl",
  ctrl: (isApple) => isApple ? <ChevronUp className="h-[0.9em] w-[0.9em]" /> : "Ctrl",
  control: (isApple) => isApple ? <ChevronUp className="h-[0.9em] w-[0.9em]" /> : "Ctrl",
  alt: (isApple) => isApple ? "⌥" : "Alt",
  option: () => "⌥",
  shift: (isApple) => isApple ? <ArrowBigUp className="h-[1em] w-[1em]" strokeWidth={1.75} /> : "Shift",
  enter: (isApple) => isApple ? <CornerDownLeft className="h-[0.9em] w-[0.9em]" /> : "Enter",
  return: (isApple) => isApple ? <CornerDownLeft className="h-[0.9em] w-[0.9em]" /> : "Enter",
  tab: (isApple) => isApple ? <ArrowRightToLine className="h-[0.9em] w-[0.9em]" /> : "Tab",
  backspace: (isApple) => isApple ? "⌫" : "Backspace",
  delete: (isApple) => isApple ? "⌫" : "Del",
  escape: () => "Esc",
  esc: () => "Esc",
  up: () => <ArrowUp className="h-[0.9em] w-[0.9em]" />,
  down: () => <ArrowDown className="h-[0.9em] w-[0.9em]" />,
  left: () => <ArrowLeft className="h-[0.9em] w-[0.9em]" />,
  right: () => <ArrowRight className="h-[0.9em] w-[0.9em]" />,
  space: () => <Space className="h-[0.9em] w-[0.9em]" />,
};

function resolveKey(key: string, isApple: boolean): React.ReactNode {
  const lower = key.toLowerCase();
  const resolver = KEY_MAP_ICONS[lower];
  return resolver ? resolver(isApple) : startCase(key);
}

export interface HotkeyProps extends VariantProps<typeof kbdVariants> {
  keys: string | string[];
  isApple?: boolean;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    container?: string;
    kbd?: string;
  };
}

const Hotkey = React.memo<HotkeyProps>(
  ({
    keys,
    isApple,
    compact = false,
    variant = "filled",
    size = "default",
    className,
    style,
    classNames,
  }) => {
    const [isAppleDevice, setIsAppleDevice] = React.useState(false);

    React.useEffect(() => {
      setIsAppleDevice(checkIsAppleDevice(isApple));
    }, [isApple]);

    const keysGroup = React.useMemo(() => splitKeysByPlus(keys), [keys]);
    const isBorderless = variant === "borderless";

    if (compact || isBorderless) {
      return (
        <kbd
          className={cn(
            "inline-flex items-center gap-1.5",
            kbdVariants({ variant, size }),
            classNames?.kbd,
            className
          )}
          style={style}
        >
          {keysGroup.map((key, i) => (
            <span key={i}>{resolveKey(key, isAppleDevice)}</span>
          ))}
        </kbd>
      );
    }

    return (
      <span
        className={cn(
          "inline-flex items-center",
          isBorderless ? "gap-1.5" : "gap-0.5",
          classNames?.container,
          className
        )}
        style={style}
      >
        {keysGroup.map((key, i) => (
          <kbd
            key={i}
            className={cn(kbdVariants({ variant, size }), classNames?.kbd)}
          >
            {resolveKey(key, isAppleDevice)}
          </kbd>
        ))}
      </span>
    );
  }
);

Hotkey.displayName = "Hotkey";

export { Hotkey, kbdVariants };
