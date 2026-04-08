import { SearchBar } from '@fluxsum/ui-kit';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <SearchBar placeholder="Search..." />
      <SearchBar placeholder="Small search" />
      <SearchBar placeholder="Loading..." loading />
      <SearchBar placeholder="Disabled" disabled />
    </div>
  );
};
