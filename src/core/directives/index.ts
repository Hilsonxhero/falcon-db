import { createApp } from 'vue'

const app = createApp({})

export const ClickOutside = app.directive('color', (el, binding) => {
    el.style.color = binding.value
})

export default ClickOutside
