import { ConfigProvider } from '@fluxsum/ui';
import { motion } from 'motion/react';

export default () => {
  return (
    <ConfigProvider config={{ proxy: 'unpkg' }} motion={motion}>
      <div style={{ padding: 16 }}>ConfigProvider Demo</div>
    </ConfigProvider>
  );
};
