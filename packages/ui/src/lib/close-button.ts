/**
 * Dialog / Sheet 等内置关闭按钮（含 X 图标）的统一样式。
 * 默认色 #999999；hover 背景 rgba(0,0,0,0.06)、文字 #080808；颜色与背景过渡 0.2s。
 */
export const closeIconButtonClassName =
  'inline-flex size-8 items-center justify-center rounded-sm text-[#999999] transition-[color,background-color] duration-200 ease-out hover:bg-[rgba(0,0,0,0.06)] hover:text-[#080808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-current'
