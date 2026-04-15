import { CodeDiff } from "../../../../src/components/CodeDiff"

export default function CodeDiffDemo() {
  return (
    <CodeDiff
      language="tsx"
      fileName="button.tsx"
      oldContent={`<Button variant="ghost">保存</Button>`}
      newContent={`<Button variant="default">保存</Button>`}
    />
  )
}
