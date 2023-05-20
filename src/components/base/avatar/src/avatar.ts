// @ts-nocheck


import {
  buildProps,
  definePropType,
  isNumber,
} from '@/core/utils'
import { componentSizes } from '@/core/constants'
import type { ExtractPropTypes } from 'vue'
import type { ObjectFitProperty } from 'csstype'
import type Avatar from './avatar.vue'

export const avatarProps = buildProps({
  size: {
    type: [Number, String],
    values: componentSizes,
    default: '',
    validator: (val: unknown): val is number => isNumber(val),
  },
  shape: {
    type: String,
    values: ['circle', 'square'],
    default: 'circle',
  },
  icon: {
    type: String,
  },
  src: {
    type: String,
    default: '',
  },
  alt: String,
  srcSet: String,
  fit: {
    type: definePropType<ObjectFitProperty>(String),
    default: 'cover',
  },
} as const)
export type AvatarProps = ExtractPropTypes<typeof avatarProps>

export const avatarEmits = {
  error: (evt: Event) => evt instanceof Event,
}
export type AvatarEmits = typeof avatarEmits

export type AvatarInstance = InstanceType<typeof Avatar>
