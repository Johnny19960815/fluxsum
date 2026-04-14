export type Style = { name: string; label: string }

export const styles: Style[] = [
  { name: "new-york-v4", label: "New York V4" },
]

export const legacyStyles = styles

export function getStyle(name: string): Style | undefined {
  return styles.find((s) => s.name === name)
}

export async function getActiveStyle(): Promise<Style> {
  return styles[0]
}
