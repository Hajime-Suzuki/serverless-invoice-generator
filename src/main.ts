import { GatewayEvent } from '@modules/types'
import { APIGatewayProxyResult, Context } from 'aws-lambda'
import { response } from '@modules/utils/response'
import { generatePdf } from '@modules/pdf'

export const handler = async (
  _event: GatewayEvent<{}>,
  _: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    await generatePdf()

    return response.success('test')
  } catch (error) {
    return response.fail(error)
  }
}
