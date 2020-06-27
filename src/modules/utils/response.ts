import { APIGatewayEvent, Context } from 'aws-lambda'

const success = (data: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

const fail = (e: Error & { status: number }) => {
  console.error(e)
  return {
    statusCode: e.status || 500,
    body: JSON.stringify({ error: e.message }),
  }
}

export const responseFormatter = (
  fn: (event: APIGatewayEvent, context: Context) => Promise<any>,
) => async (event: APIGatewayEvent, context: Context) => {
  try {
    const res = await fn(event, context)
    return success(res)
  } catch (e) {
    console.error(e.message)
    return fail(e)
  }
}
