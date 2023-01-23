

import { definePropType } from './props'
import type { Component } from 'vue'

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function,
])


export const TypeComponentsMap = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
}

