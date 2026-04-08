import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  base: '/',
  themeConfig: {
    name: 'Fluxsum UI',
    logo: false,
    nav: [
      { title: '组件', link: '/components/button' },
    ],
    socialLinks: {},
    footer: 'Fluxsum UI · 基于 dumi 构建',
    prefersColor: { default: 'auto', switch: true },
    apiHeader: {
      pkg: '@fluxsum/ui-kit',
      match: ['/components'],
      sourceUrl: '{github}/tree/main/src/{atomId}/index.tsx',
    },
  },
  resolve: {
    atomDirs: [{ dir: 'src/components', type: 'component' }],
    entryFile: './src/index.ts',
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@fluxsum/ui-kit': path.resolve(__dirname, 'src'),
  },
  styles: [
    `
    :root {
      --background: 0 0% 100%;
      --foreground: 240 10% 3.9%;
      --card: 0 0% 100%;
      --card-foreground: 240 10% 3.9%;
      --popover: 0 0% 100%;
      --popover-foreground: 240 10% 3.9%;
      --primary: 240 5.9% 10%;
      --primary-foreground: 0 0% 98%;
      --secondary: 240 4.8% 95.9%;
      --secondary-foreground: 240 5.9% 10%;
      --muted: 240 4.8% 95.9%;
      --muted-foreground: 240 3.8% 46.1%;
      --accent: 240 4.8% 95.9%;
      --accent-foreground: 240 5.9% 10%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 0 0% 98%;
      --success: 142 76% 36%;
      --success-foreground: 0 0% 98%;
      --warning: 38 92% 50%;
      --warning-foreground: 0 0% 98%;
      --info: 199 89% 48%;
      --info-foreground: 0 0% 98%;
      --border: 240 5.9% 90%;
      --input: 240 5.9% 90%;
      --ring: 240 5.9% 10%;
      --radius: 0.5rem;
    }
    [data-theme='dark'], .dark {
      --background: 240 10% 3.9%;
      --foreground: 0 0% 98%;
      --card: 240 10% 3.9%;
      --card-foreground: 0 0% 98%;
      --popover: 240 10% 3.9%;
      --popover-foreground: 0 0% 98%;
      --primary: 0 0% 98%;
      --primary-foreground: 240 5.9% 10%;
      --secondary: 240 3.7% 15.9%;
      --secondary-foreground: 0 0% 98%;
      --muted: 240 3.7% 15.9%;
      --muted-foreground: 240 5% 64.9%;
      --accent: 240 3.7% 15.9%;
      --accent-foreground: 0 0% 98%;
      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 0 0% 98%;
      --success: 142 69% 58%;
      --success-foreground: 240 5.9% 10%;
      --warning: 48 96% 53%;
      --warning-foreground: 240 5.9% 10%;
      --info: 199 89% 48%;
      --info-foreground: 240 5.9% 10%;
      --border: 240 3.7% 15.9%;
      --input: 240 3.7% 15.9%;
      --ring: 240 4.9% 83.9%;
    }
    /* Tailwind CSS variable bridge */
    *, *::before, *::after { box-sizing: border-box; border-color: hsl(var(--border)); }
    body { background-color: hsl(var(--background)); color: hsl(var(--foreground)); }
    /* Component preview wrapper */
    .dumi-default-previewer-demo {
      background: hsl(var(--background));
      color: hsl(var(--foreground));
      padding: 24px;
      border-radius: 8px;
    }
    `,
  ],
  extraPostCSSPlugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
  locales: [{ id: 'zh-CN', name: '中文' }],
  title: 'Fluxsum UI',
});
