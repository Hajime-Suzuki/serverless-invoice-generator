import { Port } from '@modules/domain/port'
import * as fs from 'fs'
import * as PDF from '@modules/resources/pdf/render-pdf'
import { TEMPLATE_PATH_LOCAL } from '@modules/utils/environments'

const savePdf: Port['savePdf'] = async pdf => {
  fs.writeFileSync('files/test.pdf', pdf)
  return { url: 'file is saved in <project-root>/files/test.pdf' }
}

export const localAdapter: Port = {
  savePdf,
  renderPdf: PDF.renderPdf(TEMPLATE_PATH_LOCAL),
}
