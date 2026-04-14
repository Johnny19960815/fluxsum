import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

const errorPlugin: () => FederationRuntimePlugin = () => ({
  name: 'error-plugin',
  errorLoadRemote({ id, error }) {
    console.error(`[MF] Failed to load remote module: ${id}`, error);
    
    return () => ({
      default: () => {
        const ErrorFallback = () => {
          return {
            type: 'div',
            props: {
              style: {
                padding: '20px',
                textAlign: 'center',
                color: '#ff4d4f',
              },
              children: `模块加载失败: ${id}`,
            },
          };
        };
        return ErrorFallback;
      },
    });
  },
});

export default errorPlugin;
