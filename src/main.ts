import { getAdapter } from '@modules/adapters/get-adapter'
import { generatePdf } from '@modules/domain/make-pdf'
import { GatewayEvent } from '@modules/types'
import { data } from '@modules/utils/dev-data'
import { parseEventBody } from '@modules/utils/event'
import { response } from '@modules/utils/response'
import { APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: GatewayEvent<string>): Promise<APIGatewayProxyResult> => {
  try {
    // fake data for developing purpose
    (event as any).body = JSON.stringify(data)

    const adapter = getAdapter()
    const payload = parseEventBody(event)

    const res = await generatePdf(adapter)({ payload })

    return response.success(res)
  } catch (error) {
    return response.fail(error)
  }
}
