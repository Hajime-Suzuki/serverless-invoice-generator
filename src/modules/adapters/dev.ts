import { Port } from '@modules/domain/port'
import * as PDF from '@modules/resources/pdf/render-pdf'
import { getS3 } from '@modules/resources/s3/s3'
import { TEMPLATE_PATH_AWS, BUCKET } from '@modules/utils/environments'

const savePdf: Port['savePdf'] = async (pdf, options) => {
  const s3 = getS3()

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

export const devAdapter: Port = {
  savePdf,
  renderPdf: PDF.renderPdf(TEMPLATE_PATH_AWS),
}
