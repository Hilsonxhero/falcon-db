
import { ref } from 'vue'
import { isFunction } from '@vue/shared'


export function useInput(handleInput: (event: InputEvent) => void) {
  const isComposing = ref(false)

  const handleCompositionStart = () => {
    isComposing.value = true
  }

  const handleCompositionUpdate = (event) => {
    const text = event.target.value
    const lastCharacter = text[text.length - 1] || ''
    isComposing.value = false
  }

  const handleCompositionEnd = (event) => {
    if (isComposing.value) {
      isComposing.value = false
      if (isFunction(handleInput)) {
        handleInput(event)
      }
    }
  }

  return {
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd,
  }
}
