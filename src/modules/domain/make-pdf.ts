import { Port, Payload } from './port'
import { Maybe } from '@modules/types'
import { mkInvoice } from './invoice'
import { getTotals } from '@modules/utils/caclulation'

const main = (adapter: Port) => async ({ payload }: { payload: Maybe<Payload> }) => {
  if (!payload) throw new Error('body can not be empty')

  const invoice = await mkInvoice(payload)

  const pdf = await adapter.renderPdf({
    ...invoice,
    totals: getTotals(invoice.items),
  })

  const res = await adapter.savePdf(pdf)

  return res
}

export const generatePdf = main
