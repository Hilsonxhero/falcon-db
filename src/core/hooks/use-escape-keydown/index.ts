import { onBeforeUnmount, onMounted } from 'vue'
import { isClient } from '@vueuse/core'
import { EVENT_CODE } from '@/core/constants'

let registeredEscapeHandlers: ((e: KeyboardEvent) => void)[] = []

export const useEscapeKeydown = (handler: (e: KeyboardEvent) => void) => {
  const cachedHandler = (e: Event) => {
    const event = e as KeyboardEvent
    if (event.key === EVENT_CODE.esc) {
      registeredEscapeHandlers.forEach((registeredHandler) =>
        registeredHandler(event)
      )
    }
  }

  onMounted(() => {
    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener('keydown', cachedHandler)
    }
    if (isClient) registeredEscapeHandlers.push(handler)
  })

  onBeforeUnmount(() => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter(
      (registeredHandler) => registeredHandler !== handler
    )
    if (registeredEscapeHandlers.length === 0) {
      if (isClient) document.removeEventListener('keydown', cachedHandler)
    }
  })
}
