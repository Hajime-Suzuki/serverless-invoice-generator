import { APIGatewayEvent } from 'aws-lambda'
import { Maybe } from '@modules/types'

export const parseEventBody = <T>(event: APIGatewayEvent): Maybe<T> => {
  return event.body ? JSON.parse(event.body) : null
}
