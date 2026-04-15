import { Highlighter } from "../../../../src/components/Highlighter"

const code = `function sum(a: number, b: number) {\n  return a + b\n}`

export default function HighlighterDemo() {
  return <Highlighter language="ts">{code}</Highlighter>
}
