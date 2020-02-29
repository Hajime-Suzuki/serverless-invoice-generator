import { IS_LOCAL } from '@modules/utils/environments'
import * as fs from 'fs'
import { renderPdf } from './render-pdf'

const main = async () => {
  const pdf = await renderPdf()

  if (IS_LOCAL) {
    fs.writeFileSync('files/test.pdf', pdf)
  }

  return true
}

export const generatePdf = main
