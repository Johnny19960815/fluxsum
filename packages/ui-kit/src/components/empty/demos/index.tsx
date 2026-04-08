import { Empty, Button } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
      <Empty />
      <Empty title="No results found" description="Try adjusting your search or filters." />
      <Empty
        title="No messages yet"
        description="Start a conversation to see messages here."
        action={<Button size="sm">New Message</Button>}
      />
    </div>
  );
};
