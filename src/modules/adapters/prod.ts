import { Port } from '@modules/domain/port'
import * as PDF from '@modules/resources/pdf/render-pdf'
import { getS3, s3Repo } from '@modules/resources/s3/s3'
import { TEMPLATE_PATH_AWS } from '@modules/utils/environments'

const savePdf: Port['savePdf'] = async (pdf, options) => {
  const s3 = getS3()
  return s3Repo.savePdf(s3)(pdf, options)
}

export const prodAdapter: Port = {
  savePdf,
  renderPdf: PDF.renderPdf(TEMPLATE_PATH_AWS),
}
