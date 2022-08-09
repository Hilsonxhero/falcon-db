import Select from './src/select.vue'

import type { App } from 'vue'
import type { SFCWithInstall } from '@/core/utils'

Select.install = (app: App): void => {
  app.component(Select.name, Select)
}

const _Select = Select as SFCWithInstall<typeof Select>

export default _Select
export const HxSelect = _Select

export * from './src/token'
