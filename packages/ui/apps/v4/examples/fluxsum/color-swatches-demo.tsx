import { ColorSwatches } from "../../../../src/components/ColorSwatches"
import { TooltipProvider } from "../../../../src/components/Tooltip"

export default function ColorSwatchesDemo() {
  return (
    <TooltipProvider>
      <ColorSwatches
        defaultValue="#2563eb"
        colors={[
          { color: "#18181b", title: "zinc" },
          { color: "#2563eb", title: "blue" },
          { color: "#0d9488", title: "teal" },
          { color: "#ea580c", title: "orange" },
        ]}
      />
    </TooltipProvider>
  )
}
