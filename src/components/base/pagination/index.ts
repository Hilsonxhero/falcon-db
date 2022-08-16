//@ts-nocheck
import Pagination from './src/pagination.ts'
import { withInstall } from '@/core/utils'
export const HxPagination = withInstall(Pagination, { name: 'HxPagination' })
export default HxPagination