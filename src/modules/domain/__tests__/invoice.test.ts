import { mkInvoiceInfo } from '../invoice'

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
})
