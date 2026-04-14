export type BaseColor = {
  name: string
  label: string
  activeColor: Record<string, string>
  cssVars: Record<string, Record<string, string>>
}

export const baseColors: BaseColor[] = []

export const baseColorsOKLCH: Record<
  string,
  { light: Record<string, string>; dark: Record<string, string> }
> = {}
