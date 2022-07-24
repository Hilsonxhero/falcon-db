import Dropdown from './src/dropdown.vue'
import DropdownMenu from './src/dropdown-menu.vue'
import DropdownItem from './src/dropdown-item.vue'
import { withInstall } from '@/core/utils'
export const HxDropdown = withInstall(Dropdown, { name: 'HxDropdown' })
export const HxDropdownMenu = withInstall(DropdownMenu, { name: 'HxDropdownMenu' })
export const HxDropdownItem = withInstall(DropdownItem, { name: 'HxDropdownItem' })
export default HxDropdown