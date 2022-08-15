import { withInstall, withNoopInstall } from '@/core/utils'

import Skeleton from './src/skeleton.vue'
import SkeletonItem from './src/skeleton-item.vue'

export const HxSkeleton = withInstall(Skeleton, {
  SkeletonItem,
})
export const HxSkeletonItem = withNoopInstall(SkeletonItem)
export default HxSkeleton

export * from './src/skeleton'
export * from './src/skeleton-item'
