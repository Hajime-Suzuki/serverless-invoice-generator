import { Port } from '@modules/domain/port'
import * as fs from 'fs'
import { renderPdf as _renderPdf } from '@modules/resources/pdf/render-pdf'

const savePdf: Port['savePdf'] = async pdf => {
  fs.writeFileSync('files/test.pdf', pdf)
  return { url: 'file is saved in <project-root>/files/test.pdf' }
}

const templatePath = 'src/pdf-template'

export const localAdapter: Port = {
  savePdf,
  renderPdf: _renderPdf(templatePath),
}
