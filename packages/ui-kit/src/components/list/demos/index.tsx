import { List } from '@fluxsum/ui-kit';

const data = [
  { id: '1', title: 'First item', desc: 'Description for first item' },
  { id: '2', title: 'Second item', desc: 'Description for second item' },
  { id: '3', title: 'Third item', desc: 'Description for third item' },
  { id: '4', title: 'Fourth item', desc: 'Description for fourth item' },
];

export default () => {
  return (
    <List
      dataSource={data}
      header={<div style={{ fontWeight: 600, fontSize: 14 }}>Item List</div>}
      renderItem={(item) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 500, fontSize: 14 }}>{item.title}</span>
          <span style={{ fontSize: 13, color: 'var(--color-muted-foreground)' }}>{item.desc}</span>
        </div>
      )}
      style={{ maxWidth: 480 }}
    />
  );
};
