import { makePdfUseCase } from '@modules/domain/make-pdf-use-case'
import { Adapter, Port } from '@modules/domain/port'
import { pdfRepo } from '@modules/resources/pdf/pdf-repo'
import { getS3, s3Repo } from '@modules/resources/s3/s3-repo'
import { TEMPLATE_PATH_AWS } from '@modules/utils/environments'
import { parseEventBody } from '@modules/utils/event'
import { GatewayBody } from './types'

const savePdf: Port['savePdf'] = async (pdf, options) => {
  const s3 = getS3()
  return s3Repo.savePdf(s3)(pdf, options)
}

export const prodPort: Port = {
  savePdf,
  renderPdf: pdfRepo.renderPdf(TEMPLATE_PATH_AWS),
}

export const prodAdapter: Adapter = port => async event => {
  const payload = parseEventBody<GatewayBody>(event)
  const res = await makePdfUseCase(port)({ payload: payload?.invoice, key: payload?.key })
  return res
}
