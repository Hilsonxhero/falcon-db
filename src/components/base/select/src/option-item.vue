<template>
  <li
    :aria-selected="selected"
    :style="style"
    class="hover:bg-gray-100 px-2 py-3 rounded-md"
    :class="[
      ns.be('dropdown', 'option-item'),
      ns.is('selected', selected),
      ns.is('disabled', disabled),
      ns.is('created', created),
      { hover: hovering },
    ]"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <slot :item="item" :index="index" :disabled="disabled">
      <span></span>
    </slot>
  </li>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent } from "vue";
import { useNamespace } from "@/core/hooks";
import { useOption } from "./useOption";
import { OptionProps } from "./defaults";

export default defineComponent({
  props: OptionProps,

  emits: ["select", "hover"],
  setup(props, { emit }) {
    const ns = useNamespace("select");
    const { hoverItem, selectOptionClick } = useOption(props, { emit });
    return {
      ns,
      hoverItem,
      selectOptionClick,
    };
  },
});
</script>
