import { Maybe } from '@modules/types'
import { Invoice } from './invoice'

export type Port = {
  savePdf: (
    pdf: Buffer,
    options?: {
      key?: Maybe<string>
    },
  ) => Promise<{
    url: string
  }>
  renderPdf: (
    data: Invoice & {
      totals: { subtotal: string; taxTotal: string; total: string }
    },
  ) => Promise<Buffer>
}
export type Payload = Maybe<Invoice>
