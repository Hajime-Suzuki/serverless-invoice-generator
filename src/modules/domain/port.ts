export type Port = {
  savePdf: (
    pdf: Buffer,
  ) => Promise<{
    url: string
  }>
  renderPdf: (data: Payload) => Promise<Buffer>
}
export type Payload = any
