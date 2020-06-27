import * as fs from 'fs'
import { Port } from '@modules/domain/port'

const savePdf: Port['savePdf'] = async pdf => {
  fs.writeFileSync('files/test.pdf', pdf)
  return { url: 'file is saved in <project-root>/files/test.pdf' }
}

export const fileRepo = {
  savePdf,
}
