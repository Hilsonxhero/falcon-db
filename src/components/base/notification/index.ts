import { withInstallFunction } from '@/core/utils'

import Notify from './src/notify'

export const HxNotification = withInstallFunction(Notify, '$notify')
export default HxNotification

export * from './src/notification'
