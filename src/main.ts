import { generatePdf } from '@modules/pdf'
import { GatewayEvent } from '@modules/types'
import { response } from '@modules/utils/response'
import { APIGatewayProxyResult, Context } from 'aws-lambda'

export const handler = async (
  _event: GatewayEvent<{}>,
  _: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    await generatePdf()
    return response.success({ success: true })
  } catch (error) {
    return response.fail(error)
  }
}
