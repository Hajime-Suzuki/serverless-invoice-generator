import { Port, Payload } from './port'
import { Maybe } from '@modules/types'

const main = (adapter: Port) => async ({ payload }: { payload: Maybe<Payload> }) => {
  if (!payload) throw new Error('body can not be empty')

  // TODO: Make domain object
  // TODO: Implement prod adapter

  const pdf = await adapter.renderPdf(payload)

  const res = await adapter.savePdf(pdf)

  return res
}

export const generatePdf = main
