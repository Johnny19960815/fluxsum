import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  react: true,
  ignores: [
    '**/dist/**',
    '**/es/**',
    '**/node_modules/**',
    '**/.dumi/**',
    '**/patches/**',
  ],
})
