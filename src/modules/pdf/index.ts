import { getBrowser } from '@modules/utils/puppeteer'
import * as fs from 'fs'

const main = async () => {
  const html =
    '<html><head><title>HTML from API Gateway/Lambda</title></head>' +
    '<body><h1>TEST!!!</h1></body></html>'

  const browser = await getBrowser()
  const page = await browser.newPage()
  await page.setContent(html)

  const res = await page.pdf({
    format: 'A4',
    displayHeaderFooter: true,
    footerTemplate: '<h4>footer</h4>',
    headerTemplate: '<h4>header</h4>',
  })

  fs.writeFileSync('files/test.pdf', res) // for development

  return true
}

export const generatePdf = main
