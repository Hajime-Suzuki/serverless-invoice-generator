import { STAGE } from '@modules/utils/environments'
import { localAdapter, localPort } from './local'
import { devAdapter, devPort } from './dev'
import { prodAdapter, prodPort } from './prod'

export const getAdapter = () => {
  switch (STAGE) {
    case 'local':
      console.log('local adapter')
      return localAdapter(localPort)
    case 'dev':
      console.log('dev adapter')
      return devAdapter(devPort)
    case 'prod':
      console.log('prod adapter')
      return prodAdapter(prodPort)
  }
}
