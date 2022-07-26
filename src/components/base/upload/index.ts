import Upload from './src/upload.vue'
import { withInstall } from '@/core/utils'
export const HxUpload = withInstall(Upload, { name: 'HxUpload' })
export default HxUpload