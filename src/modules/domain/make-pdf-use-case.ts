import { Port, Payload } from './port'
import { Maybe } from '@modules/types'
import { mkInvoice } from './invoice'
import { getTotals } from '@modules/utils/caclulation'

const main = (deps: Port) => async (args: { payload: Maybe<Payload>; key?: Maybe<string> }) => {
  if (!args.payload) throw new Error('body can not be empty')

  const invoice = await mkInvoice(args.payload)

  const pdf = await deps.renderPdf({
    ...invoice,
    totals: getTotals(invoice.items),
  })

  const res = await deps.savePdf(pdf, { key: args.key })

  return res
}

export const makePdfUseCase = main
