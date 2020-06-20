import { mkInvoiceInfo, mkItems, mkReceiver } from '../invoice'

describe('domain#invoice', () => {
  describe('InvoiceInfo', () => {
    test('should reject with aggregated error message if input is wrong', async () => {
      const res = mkInvoiceInfo({})

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

    test('should return invoice if input is correct', async () => {
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
    test('should reject with aggregated error message if input is wrong', async () => {
      const res = mkItems([{} as any])
      await expect(res).rejects.toThrowError(/name.+price.+quantity.+taxRate/)
    })
    test('should return invoice if input is correct', async () => {
      const items = [{ name: 'item1', price: '12.55', quantity: 12, taxRate: '9' }]
      const res = await mkItems(items)
      expect(res).toMatchObject(items)
    })
  })

  describe('Receiver', () => {
    test('should reject with aggregated error message if input is wrong', async () => {
      const res = mkReceiver({} as any)

      await expect(res).rejects.toThrowError(
        /name.+email.+address.+streetAddress.+postalCode.+city.+country/,
      )
    })
    test('should return invoice if input is correct', async () => {
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
})
