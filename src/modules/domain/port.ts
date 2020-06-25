import { Maybe } from '@modules/types'
import { Invoice } from './invoice'

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
export type Payload = Maybe<Invoice>
