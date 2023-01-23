import { inject } from 'vue'
import { elPaginationKey } from '@/core/tokens'

export const usePagination = () => inject(elPaginationKey, {})