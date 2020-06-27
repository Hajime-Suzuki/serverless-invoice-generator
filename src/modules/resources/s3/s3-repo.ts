import { S3, SharedIniFileCredentials } from 'aws-sdk'
import { AWS_PROFILE, IS_LOCAL, BUCKET } from '@modules/utils/environments'
import { Port } from '@modules/domain/port'

export const getS3 = () => {
  if (IS_LOCAL) {
    return new S3({
      region: process.env.REGION || 'eu-west-1',
      credentials: new SharedIniFileCredentials({ profile: AWS_PROFILE }),
    })
  }
  return new S3()
}

const savePdf: (s3: S3) => Port['savePdf'] = s3 => async (pdf, options) => {
  const baseParams = {
    Bucket: BUCKET,
    Key: options?.key || `invoices/${new Date()}.pdf`,
  }

  await s3
    .putObject({
      ...baseParams,
      Body: pdf,
      ServerSideEncryption: 'AES256',
    })
    .promise()

  const url = s3.getSignedUrl('getObject', baseParams)

  return { url }
}

export const s3Repo = {
  savePdf,
}
