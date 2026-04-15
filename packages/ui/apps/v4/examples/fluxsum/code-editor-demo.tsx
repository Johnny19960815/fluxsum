import { CodeEditor } from "../../../../src/components/CodeEditor"

export default function CodeEditorDemo() {
  return (
    <CodeEditor
      language="tsx"
      defaultValue={`export function Hello() {\n  return <div>Hello FluxSum</div>\n}`}
      height={180}
    />
  )
}
