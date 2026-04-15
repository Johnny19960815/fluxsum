import { FluxImage } from "../../../../src/components/FluxImage"

export default function FluxImageDemo() {
  return (
    <FluxImage
      src="https://avatar.vercel.sh/fluxsum"
      alt="FluxSum"
      width={240}
      height={160}
      preview
    />
  )
}
