import { Video } from "../../../../src/components/Video"

export default function VideoDemo() {
  return (
    <Video
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      width={360}
      height={220}
      muted
      playsInline
      poster="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
    />
  )
}
