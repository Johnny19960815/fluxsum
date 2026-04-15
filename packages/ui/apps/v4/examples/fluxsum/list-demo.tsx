import { List } from "../../../../src/components/List"

export default function ListDemo() {
  return (
    <List
      activeKey="design"
      items={[
        { key: "design", title: "设计系统", description: "统一组件规范" },
        { key: "docs", title: "文档站", description: "组件预览与源码" },
        { key: "theme", title: "主题系统", description: "支持 12 套配色" },
      ]}
    />
  )
}
