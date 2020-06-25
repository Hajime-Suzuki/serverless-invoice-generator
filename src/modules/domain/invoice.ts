import { formatDate } from '@modules/utils/date'
import { assertValidData, validate } from '@modules/utils/validation'
import * as yup from 'yup'
import { Maybe } from '@modules/types'

export type Invoice = {
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

export const mkInvoice = async (payload: Maybe<Invoice>) => {
  const [invoiceInfo, sender, receiver, items] = await Promise.all([
    mkInvoiceInfo(payload?.invoiceInfo),
    mkSender(payload?.sender),
    mkReceiver(payload?.receiver),
    mkItems(payload?.items),
  ])

  return {
    invoiceInfo,
    sender,
    receiver,
    items,
  } as Invoice
}

export const mkInvoiceInfo = async (payload: Maybe<InvoiceInfo>) => {
  const schema = yup
    .object({
      invoiceTitle: yup.string().required(),
      invoiceNumber: yup.string().required(),
      invoiceDate: yup.date().required(),
    })
    .required('invoice info is required')

  const invoiceDate = formatDate(payload?.invoiceDate)

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

export const mkItems = async (payload: Maybe<Item[]>) => {
  const schema = yup
    .array(
      yup.object({
        name: yup.string().required(),
        price: yup.string().required(),
        quantity: yup
          .number()
          .positive()
          .required(),
        taxRate: yup.string().required(),
      }),
    )
    .required('items is required')

  const res = await validate<Item[]>(schema, payload)

  assertValidData(res)

  return res
}

export const mkReceiver = async (payload: Maybe<Receiver>) => {
  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().required(),
      address: getAddressSchema('address of receiver is required'),
    })
    .required('receiver is required')

  const res = await validate<Receiver>(schema, payload)

  assertValidData(res)

  return res
}

export const mkSender = async (payload: Maybe<Sender>) => {
  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().required(),
      phone: yup.string().required(),
      btw: yup.string().required(),
      iban: yup.string().required(),
      address: getAddressSchema('address of sender is required'),
    })
    .required('sender is required')

  const res = await validate<Sender>(schema, payload)

  assertValidData(res)

  return res
}

const getAddressSchema = (requiredMessage: string) =>
  yup
    .object({
      streetAddress: yup.string().required(),
      postalCode: yup.string().required(),
      city: yup.string().required(),
      country: yup.string().required(),
    })
    .required(requiredMessage)
