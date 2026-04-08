import { GroupAvatar } from '@fluxsum/ui-kit';

const items = [
  { src: 'https://github.com/shadcn.png', alt: 'User 1', fallback: 'U1' },
  { src: 'https://github.com/vercel.png', alt: 'User 2', fallback: 'U2' },
  { fallback: 'AB' },
  { fallback: 'CD' },
  { fallback: 'EF' },
  { fallback: 'GH' },
];

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <GroupAvatar avatars={items} />
      <GroupAvatar avatars={items} max={3} />
      <GroupAvatar avatars={items} avatarSize={40} />
      <GroupAvatar avatars={items} shape="square" />
    </div>
  );
};
