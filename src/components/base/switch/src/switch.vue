<template>
  <label>
    <span class="mt-1">
      <input ref="input" class="switch" :aria-checked="checked" :name="name" :disabled="disabled" type="checkbox"
        @change="handleChange" />
      <!-- <span></span> -->
    </span>
    <span class="w-full mr-2  text-gray-800" @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, onMounted } from "vue";

const input = ref(null)

const props = defineProps({
  modelValue: [String, Number, Object, Array, Boolean],
  value: [String, Number, Object, Array],
  disabled: {
    type: Boolean,
    default: () => false,
  },
  name: {
    type: String,
  },

  label: {
    type: String,
  },
});
const emits = defineEmits(["update:modelValue", "change"]);

const checked = computed(() => props.modelValue === true)

// watch(checked, (val) => {
//   input.value!.checked = val

// })

const handleChange = (e: any) => {
  const val = checked.value ? false : true
  emits("update:modelValue", val)

  // input.value!.checked = checked.value

  nextTick(() => {
    input.value!.checked = checked.value
  })

}

onMounted(() => {
  input.value!.checked = checked.value
})
</script>

<style scoped lang="scss">
</style>
