import { GatewayEvent } from '@modules/types'
import { APIGatewayProxyResult, Context } from 'aws-lambda'
import { response } from '@modules/utils/response'

export const handler = async (
  event: GatewayEvent<{}>,
  _: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event)
    const html =
      '<html><head><title>HTML from API Gateway/Lambda</title></head>' +
      '<body><h1>TEST!!!</h1></body></html>'

    return response.success(html)
  } catch (error) {
    return response.fail(error)
  }
}
