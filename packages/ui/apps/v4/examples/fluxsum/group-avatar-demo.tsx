import { GroupAvatar } from "../../../../src/components/GroupAvatar"

export default function GroupAvatarDemo() {
  return (
    <GroupAvatar
      maxCount={3}
      avatars={[
        { fallback: "A", alt: "Alice" },
        { fallback: "B", alt: "Bob" },
        { fallback: "C", alt: "Cindy" },
        { fallback: "D", alt: "Dora" },
      ]}
    />
  )
}
