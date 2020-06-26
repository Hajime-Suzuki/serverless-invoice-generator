import { Item } from '@modules/domain/invoice'
import { Decimal } from 'decimal.js'

const D = (v: string | number) => new Decimal(v)

export const getTotals = (items: Item[]) => {
  const output = items.reduce(
    (totals, item) => {
      const subtotal = D(item.price).times(item.quantity)
      const tax = subtotal.times(D(item.taxRate).div(100))
      const total = subtotal.plus(tax)

      return {
        subtotal: totals.subtotal.plus(subtotal),
        taxTotal: totals.taxTotal.plus(tax),
        total: totals.total.plus(total),
      }
    },
    { subtotal: D(0), taxTotal: D(0), total: D(0) },
  )
  return {
    subtotal: output.subtotal.toFixed(2).toString(),
    taxTotal: output.taxTotal.toFixed(2).toString(),
    total: output.total.toFixed(2).toString(),
  }
}
