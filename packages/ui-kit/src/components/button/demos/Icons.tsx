import { Button } from '@fluxsum/ui-kit';
import { Plus, Download, ArrowRight, Trash2 } from 'lucide-react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button leftIcon={<Plus size={16} />}>Add Item</Button>
      <Button rightIcon={<ArrowRight size={16} />}>Continue</Button>
      <Button leftIcon={<Download size={16} />} variant="outline">
        Download
      </Button>
      <Button leftIcon={<Trash2 size={16} />} variant="destructive">
        Delete
      </Button>
    </div>
  );
};
