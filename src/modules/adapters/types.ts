import { Maybe } from '@modules/types'
import { Invoice } from '@modules/domain/invoice'

export type GatewayBody = {
  invoice: Maybe<Invoice>
  key?: Maybe<string>
}
