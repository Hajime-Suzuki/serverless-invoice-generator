### Invoice generator for my work.

---

#### Tools:

- Serverless
- Chromium to print PDF
- Pug to generate HTML from data passed to the lambda function

---

#### Flow:

- render HTML with Pug
- render a page from HTML with Chromium
- print the page as PDF with Chromium
- save the pdf to S3 bucket
- retrieve the signed url

---

#### Notes:

- main handler is in `/src/main`
- all business logic is in domain
- port and adapter pattern

---

#### How to run:

- make sure you have AWS account and set credentials.
- run `yarn install` to install dependencies
- make sure to change `serverless.yml` template or pass params when you run `yarn dev`:

```
custom:
  params:
    stage: ${opt:stage, 'local'}
    profile: ${opt:profile, 'hajime'}
    region: ${opt:region, 'eu-central-1'}
    bucket: ${opt:pdf-bucket, 'generated-invoices-${self:custom.params.stage}'}
```

- run `yarn dev` to run the development server

---

#### How to deploy:

- run `yarn deploy:<stage>`, where stage is dev or prod

---

##### Todos:

- add more validations
- Pug template is from my old project. Replace it by React

---

For local development, you need puppeteer (it's in development dependencies).
https://github.com/alixaxel/chrome-aws-lambda/issues/7#issuecomment-450402988
