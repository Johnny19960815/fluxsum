import { Tabs, TabsContent, TabsList, TabsTrigger } from '@fluxsum/ui-kit';

export default () => {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p style={{ padding: '16px 0', color: 'var(--color-muted-foreground)' }}>Overview content goes here.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p style={{ padding: '16px 0', color: 'var(--color-muted-foreground)' }}>Analytics content goes here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p style={{ padding: '16px 0', color: 'var(--color-muted-foreground)' }}>Settings content goes here.</p>
      </TabsContent>
    </Tabs>
  );
};
