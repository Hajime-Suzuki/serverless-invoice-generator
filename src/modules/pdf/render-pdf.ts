import { IS_LOCAL } from '@modules/utils/environments'
import { getBrowser } from '@modules/utils/puppeteer'
import * as fs from 'fs'
import * as pug from 'pug'
import { data } from './dev-data'

const templatePath = IS_LOCAL ? 'src/pdf-template' : `${process.env.LAMBDA_TASK_ROOT}/pdf-template`

export const renderPdf = async () => {
  const bgimg = fs.readFileSync(templatePath + '/bg.jpg', { encoding: 'base64' })

  const html = pug.renderFile(`${templatePath}/index.pug`, {
    compileDebug: true,
    ...data,
    bgUrl: `data:image/jpeg;base64,${bgimg}`,
  })

  const browser = await getBrowser()
  const page = await browser.newPage()
  await page.setContent(html)

  const pdf = await page.pdf({
    format: 'A4',
  })

  return pdf
}
