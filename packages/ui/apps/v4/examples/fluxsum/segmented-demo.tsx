import { Segmented } from "../../../../src/components/Segmented"

export default function SegmentedDemo() {
  return (
    <Segmented
      options={[
        { value: "day", label: "日" },
        { value: "week", label: "周" },
        { value: "month", label: "月" },
      ]}
      defaultValue="week"
    />
  )
}
