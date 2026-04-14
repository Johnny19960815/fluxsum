import type { SharedConfig } from '@module-federation/enhanced';

export const sharedConfig: Record<string, SharedConfig> = {
  react: {
    singleton: true,
    requiredVersion: '^18.3.0',
  },
  'react-dom': {
    singleton: true,
    requiredVersion: '^18.3.0',
  },
  antd: {
    singleton: true,
    requiredVersion: '^5.22.0',
  },
  '@ant-design/icons': {
    singleton: true,
  },
  dayjs: {
    singleton: true,
  },
  zustand: {
    singleton: true,
    requiredVersion: '^5.0.0',
  },
  '@tanstack/react-query': {
    singleton: true,
    requiredVersion: '^5.60.0',
  },
};

export const runtimePlugins = [
  '@fluxsum/mf-shared/plugins/auth-plugin',
  '@fluxsum/mf-shared/plugins/error-plugin',
];
