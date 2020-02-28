import * as chromium from 'chrome-aws-lambda'
import * as puppeteer from 'puppeteer'

export const getBrowser = async () => {
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: true,
  })

  return browser
}
