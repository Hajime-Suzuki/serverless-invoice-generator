import { Port } from '@modules/domain/port'
import * as PDF from '@modules/resources/pdf/render-pdf'
import { devAdapter } from './dev'
import { TEMPLATE_PATH_AWS } from '@modules/utils/environments'

const savePdf: Port['savePdf'] = devAdapter.savePdf

export const prodAdapter: Port = {
  savePdf,
  renderPdf: PDF.renderPdf(TEMPLATE_PATH_AWS),
}
