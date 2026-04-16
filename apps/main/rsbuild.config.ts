import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import { sharedConfig, runtimePlugins } from '../../module-federation.config'

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'host',
      remotes: {
        fixbuyAdmin: 'fixbuyAdmin@https://admin.antf.io/mf-manifest.json',
        aifootWeb: 'aifootWeb@https://aifoot.antf.io/mf-manifest.json',
      },
      shared: sharedConfig,
      runtimePlugins,
    }),
  ],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: ['@tailwindcss/postcss'],
      },
    },
  },
  server: {
    port: 3000,
  },
  output: {
    assetPrefix: '/',
  },
})
