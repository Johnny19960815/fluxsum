import { Collapse } from '@fluxsum/ui-kit';

const items = [
  {
    key: '1',
    label: 'What is Fluxsum UI?',
    children: 'Fluxsum UI is a modern React component library built with Tailwind CSS and Radix UI.',
  },
  {
    key: '2',
    label: 'How to get started?',
    children: 'Install the package with bun add @fluxsum/ui-kit and import components as needed.',
  },
  {
    key: '3',
    label: 'Is TypeScript supported?',
    children: 'Yes, all components are written in TypeScript with full type definitions.',
  },
];

export default () => {
  return (
    <div style={{ maxWidth: 520 }}>
      <Collapse items={items} defaultActiveKey="1" />
    </div>
  );
};
