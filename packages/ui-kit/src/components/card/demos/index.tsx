import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@fluxsum/ui-kit';
import { Button } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Card style={{ width: 300 }}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content can contain any elements.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
