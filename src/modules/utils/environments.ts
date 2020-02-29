export const STAGE = process.env.STAGE as string

export const IS_LOCAL = STAGE !== 'prod' && STAGE !== 'dev'
