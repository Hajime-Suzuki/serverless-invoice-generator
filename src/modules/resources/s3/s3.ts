import { S3, SharedIniFileCredentials } from 'aws-sdk'
import { AWS_PROFILE } from '@modules/utils/environments'

export const getS3 = () =>
  new S3({
    region: process.env.REGION || 'eu-west-1',
    credentials: new SharedIniFileCredentials({ profile: AWS_PROFILE }),
  })
