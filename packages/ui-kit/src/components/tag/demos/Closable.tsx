import { useState } from 'react';
import { Tag } from '@fluxsum/ui-kit';

export default () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Radix UI']);

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          closable
          onClose={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
};
