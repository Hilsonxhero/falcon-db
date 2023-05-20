// @ts-nocheck
// @ts-ignore

import { withInstallFunction } from '@/core/utils'

import Message from './src/method'

export const HxMessage = withInstallFunction(Message, '$message')
export default HxMessage

export * from './src/message'
