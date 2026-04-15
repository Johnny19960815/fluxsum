import CopyButtonDemo from "@/examples/fluxsum/copy-button-demo"
import DownloadButtonDemo from "@/examples/fluxsum/download-button-demo"
import SegmentedDemo from "@/examples/fluxsum/segmented-demo"
import ColorSwatchesDemo from "@/examples/fluxsum/color-swatches-demo"
import CodeEditorDemo from "@/examples/fluxsum/code-editor-demo"
import GroupAvatarDemo from "@/examples/fluxsum/group-avatar-demo"
import ListDemo from "@/examples/fluxsum/list-demo"
import FluxImageDemo from "@/examples/fluxsum/flux-image-demo"
import VideoDemo from "@/examples/fluxsum/video-demo"
import HighlighterDemo from "@/examples/fluxsum/highlighter-demo"
import SnippetDemo from "@/examples/fluxsum/snippet-demo"
import CodeDiffDemo from "@/examples/fluxsum/code-diff-demo"
import CollapseDemo from "@/examples/fluxsum/collapse-demo"

export const ExamplesIndex: Record<string, Record<string, any>> = {
  "new-york-v4": {
    "copy-button-demo": {
      name: "copy-button-demo",
      component: CopyButtonDemo,
      filePath: "examples/fluxsum/copy-button-demo.tsx",
    },
    "download-button-demo": {
      name: "download-button-demo",
      component: DownloadButtonDemo,
      filePath: "examples/fluxsum/download-button-demo.tsx",
    },
    "segmented-demo": {
      name: "segmented-demo",
      component: SegmentedDemo,
      filePath: "examples/fluxsum/segmented-demo.tsx",
    },
    "color-swatches-demo": {
      name: "color-swatches-demo",
      component: ColorSwatchesDemo,
      filePath: "examples/fluxsum/color-swatches-demo.tsx",
    },
    "code-editor-demo": {
      name: "code-editor-demo",
      component: CodeEditorDemo,
      filePath: "examples/fluxsum/code-editor-demo.tsx",
    },
    "group-avatar-demo": {
      name: "group-avatar-demo",
      component: GroupAvatarDemo,
      filePath: "examples/fluxsum/group-avatar-demo.tsx",
    },
    "list-demo": {
      name: "list-demo",
      component: ListDemo,
      filePath: "examples/fluxsum/list-demo.tsx",
    },
    "flux-image-demo": {
      name: "flux-image-demo",
      component: FluxImageDemo,
      filePath: "examples/fluxsum/flux-image-demo.tsx",
    },
    "video-demo": {
      name: "video-demo",
      component: VideoDemo,
      filePath: "examples/fluxsum/video-demo.tsx",
    },
    "highlighter-demo": {
      name: "highlighter-demo",
      component: HighlighterDemo,
      filePath: "examples/fluxsum/highlighter-demo.tsx",
    },
    "snippet-demo": {
      name: "snippet-demo",
      component: SnippetDemo,
      filePath: "examples/fluxsum/snippet-demo.tsx",
    },
    "code-diff-demo": {
      name: "code-diff-demo",
      component: CodeDiffDemo,
      filePath: "examples/fluxsum/code-diff-demo.tsx",
    },
    "collapse-demo": {
      name: "collapse-demo",
      component: CollapseDemo,
      filePath: "examples/fluxsum/collapse-demo.tsx",
    },
  },
}
