import { getAdapter } from '@modules/adapters/get-adapter'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { responseFormatter } from '@modules/utils/response'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const adapter = getAdapter()
  return responseFormatter(adapter)(event, context)
}
