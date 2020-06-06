import { IS_LOCAL } from '@modules/utils/environments'
import { localAdapter } from './local'
import { prodAdapter } from './prod'

export const getAdapter = () => (IS_LOCAL ? localAdapter : prodAdapter)
