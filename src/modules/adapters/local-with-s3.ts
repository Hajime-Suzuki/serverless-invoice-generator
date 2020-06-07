import { Port } from '@modules/domain/port'
import * as PDF from '@modules/resources/pdf/render-pdf'
import { TEMPLATE_PATH_LOCAL } from '@modules/utils/environments'
import { devAdapter } from './dev'

const savePdf: Port['savePdf'] = devAdapter.savePdf

export const localWithS3Adapter: Port = {
  savePdf,
  renderPdf: PDF.renderPdf(TEMPLATE_PATH_LOCAL),
}
