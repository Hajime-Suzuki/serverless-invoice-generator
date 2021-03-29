import { getTotals } from '../caclulation'
import { Invoice } from '@modules/domain/invoice'

describe('utils.calculation', () => {
  describe('getTotals', () => {
    test('calculate correct subtotal', () => {
      const items: Invoice['items'] = [
        { name: 'test', price: '12.34', quantity: 1, taxRate: '9' },
        { name: 'test', price: '13.45', quantity: 2, taxRate: '21' },
        { name: 'test', price: '9.99', quantity: 3, taxRate: '21' },
      ]

      const expected = {
        subtotal: '69.21',
        taxTotal: '13.05',
        total: '82.26',
      }
      const res = getTotals(items)

      expect(res).toMatchObject(expected)
    })

    test('format decimals: 121 -> 121.00', () => {
      const items: Invoice['items'] = [{ name: 'test', price: '100', quantity: 1, taxRate: '21' }]

      const expected = {
        subtotal: '100.00',
        taxTotal: '21.00',
        total: '121.00',
      }
      const res = getTotals(items)

      expect(res).toMatchObject(expected)
    })
  })
})
