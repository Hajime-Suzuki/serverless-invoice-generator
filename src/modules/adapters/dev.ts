import { generatePdf } from '@modules/domain/make-pdf'
import { Adapter, Port } from '@modules/domain/port'
import { pdfRepo } from '@modules/resources/pdf/pdf-repo'
import { getS3, s3Repo } from '@modules/resources/s3/s3-repo'
import { TEMPLATE_PATH_AWS } from '@modules/utils/environments'
import { parseEventBody } from '@modules/utils/event'
import { GatewayBody } from './types'

const s3 = getS3()

export const devPort: Port = {
  savePdf: s3Repo.savePdf(s3),
  renderPdf: pdfRepo.renderPdf(TEMPLATE_PATH_AWS),
}

export const devAdapter: Adapter = port => async event => {
  const payload = parseEventBody<GatewayBody>(event)

  const res = await generatePdf(port)({ payload: payload?.invoice, key: payload?.key })

  return res
}
