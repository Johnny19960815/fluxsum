import antfu from '@antfu/eslint-config';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';

export default antfu(
  {
    ignores: [
      'node_modules',
      'coverage',
      '.coverage',
      'jest*',
      '_test_',
      '__test__',
      '.umi',
      '.umi-production',
      '.umi-test',
      '.dumi/tmp*',
      '!.dumirc.ts',
      'dist',
      'es',
      'lib',
      'logs',
    ],
    regexp: false,
    react: true,
    typescript: true,
  },
  {
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'off',
      'import/consistent-type-specifier-style': 'off',
      'unicorn/better-regex': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/prefer-logical-operator-over-ternary': 'off',
    },
  },
  {
    plugins: {
      'sort-keys-fix': sortKeysFix,
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
    },
  },
);
