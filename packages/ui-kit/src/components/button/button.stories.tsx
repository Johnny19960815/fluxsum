import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Plus, ArrowRight, Download, Trash2, Mail, Settings } from "lucide-react";
import { Button } from "./button";

/**
 * Button 是最基础的交互组件，用于触发操作或事件。
 *
 * ## 设计原则
 *
 * - **主要按钮**: 每个页面只应有一个主要按钮，用于最重要的操作
 * - **次要按钮**: 用于次要操作，视觉权重较低
 * - **危险按钮**: 仅用于不可逆的危险操作，如删除
 *
 * ## 使用场景
 *
 * - 表单提交
 * - 对话框确认/取消
 * - 触发弹窗或抽屉
 * - 导航跳转
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "一个功能丰富的按钮组件，支持多种变体、尺寸、图标和加载状态。",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "success",
        "warning",
        "info",
        "filled",
      ],
      description: "按钮的视觉风格",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "xl", "icon", "icon-sm", "icon-lg"],
      description: "按钮的尺寸",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    loading: {
      control: "boolean",
      description: "是否显示加载状态",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "是否禁用按钮",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    block: {
      control: "boolean",
      description: "是否为块级按钮（占满容器宽度）",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    glass: {
      control: "boolean",
      description: "是否启用玻璃拟态效果",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    shadow: {
      control: "boolean",
      description: "是否显示阴影",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    shine: {
      control: "boolean",
      description: "是否启用闪光效果",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    asChild: {
      control: "boolean",
      description: "是否作为子组件渲染（使用 Radix Slot）",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    leftIcon: {
      control: false,
      description: "左侧图标",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    rightIcon: {
      control: false,
      description: "右侧图标",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    children: {
      control: "text",
      description: "按钮内容",
    },
    onClick: {
      action: "clicked",
      description: "点击事件处理函数",
    },
  },
  args: {
    onClick: fn(),
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 默认按钮，用于主要操作
 */
export const Default: Story = {
  args: {
    children: "Button",
  },
};

/**
 * 所有变体展示
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
      <Button variant="filled">Filled</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示所有可用的按钮变体样式",
      },
    },
  },
};

/**
 * 所有尺寸展示
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示所有可用的按钮尺寸",
      },
    },
  },
};

/**
 * 带图标的按钮
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<Plus className="h-4 w-4" />}>Add Item</Button>
      <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
        Continue
      </Button>
      <Button
        leftIcon={<Download className="h-4 w-4" />}
        rightIcon={<ArrowRight className="h-4 w-4" />}
      >
        Download
      </Button>
      <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
        Delete
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "按钮可以在左侧或右侧添加图标，增强视觉提示",
      },
    },
  },
};

/**
 * 图标按钮
 */
export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="icon-sm" variant="ghost">
        <Settings className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline">
        <Mail className="h-4 w-4" />
      </Button>
      <Button size="icon-lg" variant="secondary">
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "仅包含图标的按钮，适用于工具栏等场景",
      },
    },
  },
};

/**
 * 加载状态
 */
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Loading</Button>
      <Button loading variant="secondary">
        Processing
      </Button>
      <Button loading variant="outline">
        Saving
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "加载状态会显示旋转图标并禁用按钮交互",
      },
    },
  },
};

/**
 * 禁用状态
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button disabled variant="secondary">
        Disabled
      </Button>
      <Button disabled variant="outline">
        Disabled
      </Button>
      <Button disabled variant="destructive">
        Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "禁用状态的按钮无法交互，视觉上呈现半透明效果",
      },
    },
  },
};

/**
 * 块级按钮
 */
export const Block: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Button block>Full Width Button</Button>
      <Button block variant="outline">
        Full Width Outline
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "块级按钮会占满容器的整个宽度",
      },
    },
  },
};

/**
 * 特效按钮
 */
export const Effects: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button shadow>With Shadow</Button>
      <Button shine>With Shine</Button>
      <Button glass className="bg-primary/50">
        Glass Effect
      </Button>
      <Button shadow shine>
        Shadow + Shine
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "按钮支持阴影、闪光和玻璃拟态等视觉特效",
      },
    },
  },
};

/**
 * 作为链接使用
 */
export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Visit Website
      </a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: "使用 `asChild` 属性可以将按钮样式应用到其他元素（如链接）上",
      },
    },
  },
};

/**
 * 按钮组合示例
 */
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "常见的按钮组合模式：取消 + 确认",
      },
    },
  },
};
