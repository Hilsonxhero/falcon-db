import { withInstall } from '@/core/utils'
import Popper from './src/popper.vue'

import HxPopperArrow from './src/arrow.vue'
import HxPopperTrigger from './src/trigger.vue'
import HxPopperContent from './src/content.vue'

export { HxPopperArrow, HxPopperTrigger, HxPopperContent }

export const HxPopper = withInstall(Popper)
export default HxPopper

export * from './src/popper'
export * from './src/trigger'
export * from './src/content'
export * from './src/arrow'

export type { Placement, Options } from '@popperjs/core'
export type HxPopperArrowInstance = InstanceType<typeof HxPopperArrow>
export type HxPopperArrowTrigger = InstanceType<typeof HxPopperTrigger>
export type HxPopperArrowContent = InstanceType<typeof HxPopperContent>
