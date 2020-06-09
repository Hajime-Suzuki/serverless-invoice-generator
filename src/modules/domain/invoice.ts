import { formatDate } from '@modules/utils/date'
import { assertValidData, validate } from '@modules/utils/validation'
import * as yup from 'yup'

type Invoice = {
  invoiceInfo: InvoiceInfo
  sender: Sender
  receiver: Receiver
  items: Item[]
}

type Sender = {
  name: string
  email: string
  phone: string
  btw: string
  iban: string
  address: Address
}

type Receiver = {
  name: string
  email: string
  address: Address
}

type Address = {
  streetAddress: string
  postalCode: string
  city: string
}

type InvoiceInfo = {
  invoiceTitle: string
  invoiceNumber: string
  invoiceDate: string
}

type Item = {
  name: string
  price: string
  quantity: number
  taxRate: string
}

export const mkInvoiceInfo = async (payload: Partial<InvoiceInfo>): Promise<InvoiceInfo> => {
  const schema = yup.object({
    invoiceTitle: yup.string().required(),
    invoiceNumber: yup.string().required(),
    invoiceDate: yup.date().required(),
  })
  const invoiceDate = formatDate(payload.invoiceDate)

  const res = await validate<InvoiceInfo>(schema, {
    ...payload,
    invoiceDate,
  })

  assertValidData<InvoiceInfo>(res)

  return {
    ...res,
    invoiceDate,
  } as InvoiceInfo
}
