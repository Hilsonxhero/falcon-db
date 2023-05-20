
// @ts-nocheck
// @ts-ignore
import { withInstall } from '@/core/utils'

import ConfigProvider from './src/config-provider'

export const HxConfigProvider = withInstall(ConfigProvider)
export default HxConfigProvider

export * from './src/config-provider'
