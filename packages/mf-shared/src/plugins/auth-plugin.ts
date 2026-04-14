import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';

const authPlugin: () => FederationRuntimePlugin = () => ({
  name: 'auth-plugin',
  beforeRequest(args) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('sso_token') : null;
    if (token) {
      args.options.headers = {
        ...args.options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return args;
  },
});

export default authPlugin;
