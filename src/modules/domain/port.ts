export type Port = {
  savePdf: (
    pdf: Buffer,
    options?: {
      key: string
    },
  ) => Promise<{
    url: string
  }>
  renderPdf: (data: Payload) => Promise<Buffer>
}
export type Payload = any
