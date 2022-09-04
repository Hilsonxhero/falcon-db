<template>
  <label
    :class="[
      ns.b(),
      ns.is('disabled', disabled),
      ns.is('focus', focus),
      ns.is('bordered', border),
      // ns.is('checked', modelValue === label),
      ns.m(size),
    ]"
  >
    <span
      :class="[
        ns.e('input'),
        ns.is('disabled', disabled),
        ns.is('checked', modelValue === label),
      ]"
    >
      <input
        ref="radioRef"
        :class="ns.e('original')"
        :value="label"
        :name="name || radioGroup?.name"
        :disabled="disabled"
        type="radio"
        @change="handleChange"
        v-model="modelValue"
      />
      <span :class="ns.e('inner')" />
    </span>
    <span class="mr-2" :class="ns.e('label')" @keydown.stop>
      <slot>
        <!-- {{ label }} -->
      </slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { nextTick } from "vue";
import { useNamespace } from "@/core/hooks";
import { radioEmits, radioProps } from "./radio";
import { useRadio } from "./use-radio";

defineOptions({
  name: "HxRadio",
});

const props = defineProps(radioProps);
const emit = defineEmits(radioEmits);

const ns = useNamespace("radio");
const { radioRef, radioGroup, focus, size, disabled, modelValue, value } =
  useRadio(props, emit);

function handleChange() {
  nextTick(() => emit("change", modelValue));
}
</script>
