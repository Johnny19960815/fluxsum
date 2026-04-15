import type { Registry } from "shadcn/schema"

/** Chart 示例与 chart 组件的注册表条目（供 CLI / registry 合并使用） */
export const charts: Registry["items"] = [
  {
    name: "chart-bar-demo",
    type: "registry:example",
    registryDependencies: ["chart"],
    files: [
      {
        path: "examples/chart-bar-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "chart-bar-demo-grid",
    type: "registry:example",
    registryDependencies: ["chart"],
    files: [
      {
        path: "examples/chart-bar-demo-grid.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "chart-bar-demo-axis",
    type: "registry:example",
    registryDependencies: ["chart"],
    files: [
      {
        path: "examples/chart-bar-demo-axis.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "chart-bar-demo-tooltip",
    type: "registry:example",
    registryDependencies: ["chart"],
    files: [
      {
        path: "examples/chart-bar-demo-tooltip.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "chart-bar-demo-legend",
    type: "registry:example",
    registryDependencies: ["chart"],
    files: [
      {
        path: "examples/chart-bar-demo-legend.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "chart-tooltip-demo",
    type: "registry:example",
    registryDependencies: ["chart"],
    files: [
      {
        path: "examples/chart-tooltip-demo.tsx",
        type: "registry:example",
      },
    ],
  },
]
