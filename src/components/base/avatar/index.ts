import Avatar from './src/avatar.vue'
import { withInstall } from '@/core/utils'
import type { SFCWithInstall } from '@/core/utils'

Avatar.install = (app: App): void => {
    app.component(Avatar.name, Avatar)
}
const _Avatar = Avatar as SFCWithInstall<typeof Avatar>

export default _Avatar
export const HxAvatar = _Avatar

// export const HxAvatar = withInstall(Avatar, { name: 'HxAvatar' })
// export default HxAvatar