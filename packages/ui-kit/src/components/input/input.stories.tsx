import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mail, Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "./input";
import { useState } from "react";

/**
 * Input 是用于接收用户文本输入的基础组件。
 *
 * ## 设计原则
 *
 * - 输入框应有清晰的标签和占位符
 * - 错误状态应提供明确的反馈
 * - 支持各种输入类型和装饰元素
 */
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "一个功能丰富的输入框组件，支持多种变体、尺寸、装饰元素和验证状态。",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "ghost", "underline"],
      description: "输入框的视觉风格",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    inputSize: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "输入框的尺寸",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    error: {
      control: "boolean",
      description: "是否显示错误状态",
    },
    success: {
      control: "boolean",
      description: "是否显示成功状态",
    },
    disabled: {
      control: "boolean",
      description: "是否禁用",
    },
    placeholder: {
      control: "text",
      description: "占位符文本",
    },
    errorMessage: {
      control: "text",
      description: "错误提示信息",
    },
    helperText: {
      control: "text",
      description: "帮助文本",
    },
  },
  args: {
    placeholder: "Enter text...",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 默认输入框
 */
export const Default: Story = {
  args: {
    placeholder: "Enter your name",
  },
};

/**
 * 所有变体展示
 */
export const AllVariants: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Input variant="default" placeholder="Default variant" />
      <Input variant="filled" placeholder="Filled variant" />
      <Input variant="ghost" placeholder="Ghost variant" />
      <Input variant="underline" placeholder="Underline variant" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示所有可用的输入框变体样式",
      },
    },
  },
};

/**
 * 所有尺寸展示
 */
export const AllSizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="default" placeholder="Default input" />
      <Input inputSize="lg" placeholder="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示所有可用的输入框尺寸",
      },
    },
  },
};

/**
 * 带图标的输入框
 */
export const WithIcons: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Input
        leftAddon={<Search className="h-4 w-4" />}
        placeholder="Search..."
      />
      <Input
        leftAddon={<Mail className="h-4 w-4" />}
        placeholder="Email address"
        type="email"
      />
      <Input
        leftAddon={<Lock className="h-4 w-4" />}
        rightAddon={<Eye className="h-4 w-4 cursor-pointer" />}
        placeholder="Password"
        type="password"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "输入框可以在左侧或右侧添加图标装饰",
      },
    },
  },
};

/**
 * 密码输入框（带切换可见性）
 */
export const PasswordInput: Story = {
  render: function PasswordInputStory() {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="w-80">
        <Input
          leftAddon={<Lock className="h-4 w-4" />}
          rightAddon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          placeholder="Enter password"
          type={showPassword ? "text" : "password"}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "密码输入框示例，支持切换密码可见性",
      },
    },
  },
};

/**
 * 验证状态
 */
export const ValidationStates: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Input
        placeholder="Normal input"
        helperText="This is helper text"
      />
      <Input
        error
        placeholder="Error input"
        errorMessage="This field is required"
      />
      <Input
        success
        placeholder="Success input"
        helperText="Looks good!"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示输入框的不同验证状态",
      },
    },
  },
};

/**
 * 禁用状态
 */
export const Disabled: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Input disabled placeholder="Disabled input" />
      <Input disabled value="Disabled with value" />
      <Input
        disabled
        leftAddon={<Mail className="h-4 w-4" />}
        placeholder="Disabled with icon"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "禁用状态的输入框无法交互",
      },
    },
  },
};

/**
 * 不同输入类型
 */
export const InputTypes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
      <Input type="date" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "支持各种 HTML 输入类型",
      },
    },
  },
};

/**
 * 表单示例
 */
export const FormExample: Story = {
  render: () => (
    <form className="w-80 space-y-4">
      <div>
        <label className="text-sm font-medium mb-1.5 block">Email</label>
        <Input
          type="email"
          leftAddon={<Mail className="h-4 w-4" />}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">Password</label>
        <Input
          type="password"
          leftAddon={<Lock className="h-4 w-4" />}
          placeholder="Enter password"
          helperText="At least 8 characters"
        />
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: "在表单中使用输入框的示例",
      },
    },
  },
};
