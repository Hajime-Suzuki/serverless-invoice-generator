export const STAGE = (process.env.STAGE || 'local') as 'prod' | 'dev' | 'local'

export const IS_LOCAL = STAGE !== 'prod' && STAGE !== 'dev'

export const BUCKET = process.env.BUCKET as string

export const TEMPLATE_PATH_AWS = `${process.env.LAMBDA_TASK_ROOT}/pdf-template`
export const TEMPLATE_PATH_LOCAL = 'src/pdf-template'

export const AWS_PROFILE = process.env.PROFILE
