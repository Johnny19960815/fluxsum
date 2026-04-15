import { DownloadButton } from "../../../../src/components/DownloadButton"

export default function DownloadButtonDemo() {
  return (
    <DownloadButton
      blobUrl="data:text/plain;charset=utf-8,FluxSum%20UI"
      fileName="fluxsum-ui"
      fileType="txt"
    />
  )
}
