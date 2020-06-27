import chromium from 'chrome-aws-lambda'

export const getBrowser = async () => {
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: true,
  })
  return browser
}
