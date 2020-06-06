import { Port } from '@modules/domain/port'
import * as fs from 'fs'
import * as pug from 'pug'
import { getBrowser } from '../puppeteer/puppeteer'

type RenderPdf = (templatePath: string) => Port['renderPdf']

export const renderPdf: RenderPdf = templatePath => async data => {
  const bgimg = fs.readFileSync(templatePath + '/bg.jpg', { encoding: 'base64' })

  const html = pug.renderFile(`${templatePath}/index.pug`, {
    compileDebug: true,
    ...data,
    bgUrl: `data:image/jpeg;base64,${bgimg}`,
  })

  const browser = await getBrowser()
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })

  const pdf = await page.pdf({
    format: 'A4',
  })

  return pdf
}
