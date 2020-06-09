import { format, isValid } from 'date-fns'
import { Maybe } from '@modules/types'

export const formatDate = (date: Maybe<Date | string>) => {
  if (!date || !isValid(new Date(date))) return null
  return format(new Date(date), 'yyyy-MM-dd')
}
