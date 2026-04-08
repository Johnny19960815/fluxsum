import { Button, ConfigProvider, ThemeProvider } from '@fluxsum/ui';
import { motion } from 'motion/react';

export default () => {
  return (
    <ConfigProvider motion={motion}>
      <ThemeProvider>
        <Button type="primary">LobeHub</Button>
      </ThemeProvider>
    </ConfigProvider>
  );
};
