import { withInstall, withNoopInstall } from '@/core/utils'
import Collapse from './src/collapse.vue'
import CollapseItem from './src/collapse-item.vue'

export const HxCollapse = withInstall(Collapse, { CollapseItem, name: 'HxCollapse' })
export default HxCollapse

// export const HxCollapseItem = withNoopInstall(CollapseItem)
export const HxCollapseItem = withInstall(CollapseItem, { CollapseItem, name: 'HxCollapseItem' })
export * from './src/collapse'