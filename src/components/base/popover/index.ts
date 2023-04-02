import { withInstall, withInstallDirective } from '@/core/utils'

import Popover from './src/popover.vue'
import PopoverDirective, { VPopover } from './src/directive'

export const HxPopoverDirective = withInstallDirective(
  PopoverDirective,
  VPopover
)

export const HxPopover = withInstall(Popover, {
  directive: HxPopoverDirective,
})
export default HxPopover

export * from './src/popover'
