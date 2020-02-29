import { S3 } from 'aws-sdk'

export const getS3 = () => {
  return new S3()
}
