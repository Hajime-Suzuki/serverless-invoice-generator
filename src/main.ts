import { getAdapter } from '@modules/adapters/get-adapter'
import { Invoice } from '@modules/domain/invoice'
import { generatePdf } from '@modules/domain/make-pdf'
import { GatewayEvent, Maybe } from '@modules/types'
import { parseEventBody } from '@modules/utils/event'
import { response } from '@modules/utils/response'
import { APIGatewayProxyResult } from 'aws-lambda'

type GatewayBody = {
  invoice: Maybe<Invoice>
  key?: Maybe<string>
}

export const handler = async (event: GatewayEvent<string>): Promise<APIGatewayProxyResult> => {
  try {
    const adapter = getAdapter()
    const payload = parseEventBody<GatewayBody>(event)
    const res = await generatePdf(adapter)({ payload: payload?.invoice, key: payload?.key })

    return response.success(res)
  } catch (error) {
    return response.fail(error)
  }
}
