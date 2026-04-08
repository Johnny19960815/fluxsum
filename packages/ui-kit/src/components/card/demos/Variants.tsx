import { Card, CardHeader, CardTitle, CardContent } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Card style={{ width: 200 }}>
        <CardHeader><CardTitle>Default</CardTitle></CardHeader>
        <CardContent><p>Default card style.</p></CardContent>
      </Card>
      <Card variant="outline" style={{ width: 200 }}>
        <CardHeader><CardTitle>Outlined</CardTitle></CardHeader>
        <CardContent><p>Outlined card style.</p></CardContent>
      </Card>
      <Card variant="filled" style={{ width: 200 }}>
        <CardHeader><CardTitle>Filled</CardTitle></CardHeader>
        <CardContent><p>Filled card style.</p></CardContent>
      </Card>
      <Card hoverable style={{ width: 200 }}>
        <CardHeader><CardTitle>Hoverable</CardTitle></CardHeader>
        <CardContent><p>Hover to see the effect.</p></CardContent>
      </Card>
    </div>
  );
};
