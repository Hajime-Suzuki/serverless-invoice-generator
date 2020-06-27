import { generatePdf } from '@modules/domain/make-pdf'
import { Port, Adapter } from '@modules/domain/port'
import { fileRepo } from '@modules/resources/files/file-repo'
import { pdfRepo } from '@modules/resources/pdf/pdf-repo'
import { getS3, s3Repo } from '@modules/resources/s3/s3-repo'
import { TEMPLATE_PATH_LOCAL } from '@modules/utils/environments'
import data from '../../../data/test-data.json'

const s3 = getS3()

export const localPort: Port = {
  savePdf: fileRepo.savePdf,
  renderPdf: pdfRepo.renderPdf(TEMPLATE_PATH_LOCAL),
}

const _localWithS3Port: Port = {
  savePdf: s3Repo.savePdf(s3),
  renderPdf: pdfRepo.renderPdf(TEMPLATE_PATH_LOCAL),
}

export const localAdapter: Adapter = port => async () => {
  const res = await generatePdf(port)({ payload: data.invoice, key: data.key })

  return res
}
