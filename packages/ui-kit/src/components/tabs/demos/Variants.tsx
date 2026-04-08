import { Tabs, TabsContent, TabsList, TabsTrigger } from '@fluxsum/ui-kit';

const items = [
  { value: 'a', label: 'Tab A' },
  { value: 'b', label: 'Tab B' },
  { value: 'c', label: 'Tab C' },
];

const TabsDemo = ({ variant }: { variant: any }) => (
  <Tabs defaultValue="a">
    <TabsList variant={variant}>
      {items.map((i) => (
        <TabsTrigger key={i.value} value={i.value} variant={variant}>
          {i.label}
        </TabsTrigger>
      ))}
    </TabsList>
    {items.map((i) => (
      <TabsContent key={i.value} value={i.value}>
        <p style={{ padding: '8px 0', color: 'var(--color-muted-foreground)', fontSize: 14 }}>
          Content for {i.label}
        </p>
      </TabsContent>
    ))}
  </Tabs>
);

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div><p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>default</p><TabsDemo variant="default" /></div>
    <div><p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>line</p><TabsDemo variant="line" /></div>
    <div><p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>pills</p><TabsDemo variant="pills" /></div>
    <div><p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>segment</p><TabsDemo variant="segment" /></div>
    <div><p style={{ fontSize: 12, color: 'var(--color-muted-foreground)', marginBottom: 8 }}>card</p><TabsDemo variant="card" /></div>
  </div>
);
