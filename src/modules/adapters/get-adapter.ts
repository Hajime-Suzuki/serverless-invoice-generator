import { localAdapter } from './local'

export const getAdapter = () => localAdapter
// export const getAdapter = () => (IS_LOCAL ? localAdapter : prodAdapter)
