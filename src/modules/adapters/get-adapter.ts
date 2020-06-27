import { localAdapter } from './local'
import { IS_LOCAL } from '@modules/utils/environments'
import { prodAdapter } from './prod'

export const getAdapter = () => (IS_LOCAL ? localAdapter : prodAdapter)
