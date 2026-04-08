import { TextArea } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <TextArea placeholder="Default textarea" rows={3} />
      <TextArea placeholder="Filled textarea" variant="filled" rows={3} />
      <TextArea placeholder="Resizable textarea" resize rows={3} />
    </div>
  );
};
