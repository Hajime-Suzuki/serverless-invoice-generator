import { localWithS3Adapter } from './local-with-s3'

export const getAdapter = () => localWithS3Adapter
// export const getAdapter = () => (IS_LOCAL ? localAdapter : prodAdapter)
