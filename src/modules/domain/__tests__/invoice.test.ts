import { mkInvoiceInfo, mkItems, mkReceiver, mkSender } from '../invoice'

describe('domain#invoice', () => {
  describe('InvoiceInfo', () => {
    test('should reject with aggregated error message if there are missing fields', async () => {
      const res = mkInvoiceInfo({} as any)

      await expect(res).rejects.toThrowError(/invoiceTitle.+invoiceNumber.+invoiceDate/)
    })

    test('should reject if invoice date is not valid', async () => {
      const data = {
        invoiceTitle: 'title',
        invoiceNumber: '1234',
        invoiceDate: 'invalid date',
      }
      const res = mkInvoiceInfo(data)
      await expect(res).rejects.toThrowError(/invoiceDate/)
    })

    test('should return invoice info if input is correct', async () => {
      const data = {
        invoiceTitle: 'title',
        invoiceNumber: '1234',
        invoiceDate: '2000-01-01',
      }
      const res = await mkInvoiceInfo(data)

      expect(res).toMatchObject(data)
    })
  })

  describe('Items', () => {
    test('should reject with aggregated error message if there are missing fields', async () => {
      const res = mkItems([{} as any])
      await expect(res).rejects.toThrowError(/name.+price.+quantity.+taxRate/)
    })
    test('should return items if input is correct', async () => {
      const items = [{ name: 'item1', price: '12.55', quantity: 12, taxRate: '9' }]
      const res = await mkItems(items)
      expect(res).toMatchObject(items)
    })
    test('should format price', async () => {
      const item1 = { name: 'item1', price: '100', quantity: 1, taxRate: '21' }
      const expected1 = { ...item1, price: '100.00' }

      const res1 = await mkItems([item1])
      expect(res1).toMatchObject([expected1])

      const item2 = { name: 'item1', price: '100.1', quantity: 1, taxRate: '21' }
      const expected2 = { ...item1, price: '100.10' }

      const res = await mkItems([item2])
      expect(res).toMatchObject([expected2])
    })
  })

  describe('Receiver', () => {
    test('should reject with aggregated error message if there are missing fields', async () => {
      const res = mkReceiver({} as any)

      await expect(res).rejects.toThrowError(
        /name.+email.+address.+streetAddress.+postalCode.+city.+country/,
      )
    })
    test('should return receiver if input is correct', async () => {
      const receiver = {
        name: 'name',
        email: 'email is not validated though',
        address: {
          streetAddress: 'street1',
          postalCode: '1234AB',
          city: 'some city',
          country: 'Netherlands',
        },
      }
      const res = await mkReceiver(receiver)
      expect(res).toMatchObject(receiver)
    })
  })

  describe('Sender', () => {
    test('should reject with aggregated error message if there are missing fields', async () => {
      const res = mkSender({} as any)

      await expect(res).rejects.toThrowError(
        /name.+email.+phone.+btw.+kvk.+iban.+address.+streetAddress.+postalCode.+city.+country./,
      )
    })
    test('should return sender if input is correct', async () => {
      const receiver = {
        name: 'name',
        email: 'email is not validated though',
        phone: '1234567890',
        btw: 'abcdefgh',
        kvk: '1234',
        iban: '123412341234',
        address: {
          streetAddress: 'street1',
          postalCode: '1234AB',
          city: 'some city',
          country: 'Netherlands',
        },
      }
      const res = await mkSender(receiver)
      expect(res).toMatchObject(receiver)
    })
  })
})
