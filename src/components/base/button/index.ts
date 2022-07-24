import Button from './src/button.vue'
import { withInstall } from '@/core/utils'
export const HxButton = withInstall(Button, { name: 'HxButton' })
export default HxButton
export * from './src/button'