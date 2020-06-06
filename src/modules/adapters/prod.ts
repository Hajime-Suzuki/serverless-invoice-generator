import * as PDF from '@modules/resources/pdf/render-pdf'
import { Port } from '@modules/domain/port'

const savePdf: Port['savePdf'] = async () => {
  console.error('to be implemented')
  return { url: 'to be implemented' }
}

const templatePath = `${process.env.LAMBDA_TASK_ROOT}/pdf-template`

export const prodAdapter: Port = {
  savePdf,
  renderPdf: PDF.renderPdf(templatePath),
}
