import { getAdapter } from '@modules/adapters/get-adapter'
import { generatePdf } from '@modules/domain/make-pdf'
import { GatewayEvent, Maybe } from '@modules/types'
import { data } from '@modules/utils/dev-data'
import { parseEventBody } from '@modules/utils/event'
import { response } from '@modules/utils/response'
import { APIGatewayProxyResult } from 'aws-lambda'
import { IS_LOCAL } from '@modules/utils/environments'
import { Invoice } from '@modules/domain/invoice'

export const handler = async (event: GatewayEvent<string>): Promise<APIGatewayProxyResult> => {
  try {
    if (IS_LOCAL) {
      // fake data for developing purpose
      ;(event as any).body = JSON.stringify(data)
    }

    const adapter = getAdapter()
    const payload = parseEventBody<Maybe<Invoice>>(event)
    const res = await generatePdf(adapter)({ payload })

    return response.success(res)
  } catch (error) {
    return response.fail(error)
  }
}
