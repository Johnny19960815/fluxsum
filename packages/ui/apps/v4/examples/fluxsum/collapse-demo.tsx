import { Collapse } from "../../../../src/components/Collapse"

export default function CollapseDemo() {
  return (
    <Collapse
      defaultActiveKeys={["theme"]}
      items={[
        {
          key: "theme",
          label: "主题系统",
          description: "支持 12 套配色",
          children: "主题支持亮色、暗色和跟随系统模式切换。",
        },
        {
          key: "docs",
          label: "文档能力",
          description: "预览与源码并存",
          children: "文档页面同时包含预览、源码和说明，方便人和 AI 阅读。",
        },
      ]}
    />
  )
}
