import { buildProps, definePropType, mutable } from '@/core/utils'
import type { ExtractPropTypes } from 'vue'
import type { TabsPaneContext } from '@/core/tokens'
import type TabBar from './tab-bar.vue'

export const tabBarProps = buildProps({
  tabs: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => mutable([] as const),
  },
} as const)

export type TabBarProps = ExtractPropTypes<typeof tabBarProps>
export type TabBarInstance = InstanceType<typeof TabBar>
