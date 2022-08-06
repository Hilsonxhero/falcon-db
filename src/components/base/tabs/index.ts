import { withInstall, withNoopInstall } from '@/core/utils'
import Tabs from './src/tabs.vue'
import TabPane from './src/tab-pane.vue'

export const HxTabs = withInstall(Tabs, { Tabs })

export default HxTabs

export const HxTabPane = withInstall(TabPane, { TabPane })

export * from './src/tabs'
export * from './src/tab-pane'
