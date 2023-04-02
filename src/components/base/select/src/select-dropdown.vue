<template>
  <div
    :class="[ns.e('dropdown'), ns.is('multiple', multiple)]"
    :style="{ width: `${width}px` }"
  >
    <div class="p-3" v-if="data.length === 0">
      <p class="text-center text-sm text-gray-400">
        <slot name="empty"></slot>
      </p>
    </div>
    <!-- v-infinite-scroll="load" -->
    <ul ref="listRef" class="space-y-2 p-2 overflow-auto max-h-[12rem]" v-else>
      <OptionItem
        v-for="(item, index) in data"
        :item="item"
        :index="index"
        :disabled="item.disabled"
        @select="onSelect"
        :selected="isSelected(item)"
      >
        <slot :item="item">{{ isObject(item) ? item[label] : item }}</slot>
      </OptionItem>
    </ul>
  </div>
</template>

<script setup lang="ts">
//@ts-nocheck
import { computed, inject, ref, unref } from "vue";
import { get } from "lodash-unified";
import { isObject, isUndefined } from "@/core/utils";
import { useNamespace } from "@/core/hooks";
import { EVENT_CODE } from "@/core/constants";
import GroupItem from "./group-item.vue";
import OptionItem from "./option-item.vue";
import { selectV2InjectionKey } from "./token";

import type { Option, OptionItemProps } from "./select.types";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  hoveringIndex: Number,
  width: Number,
});

const select = inject(selectV2InjectionKey)!;
const ns = useNamespace("select");
const cachedHeights = ref<Array<number>>([]);
const listRef = ref(null);

const load = () => {};

// const scrollToItem = (index: number) => {
//   const list = listRef.value as any
//   if (list) {
//     list.scrollToItem = scrollToItem(index)
//   }
// }

const { multiple, modelValue, label } = select.props;

const isSized = computed(() => isUndefined(select.props.estimatedOptionHeight));
const listProps = computed(() => {
  if (isSized.value) {
    return {
      itemSize: select.props.itemHeight,
    };
  }

  return {
    estimatedSize: select.props.estimatedOptionHeight,
    itemSize: (idx: number) => cachedHeights.value[idx],
  };
});

const isDisabled = (item): boolean => {
  return isItemDisabled(modelValue, isSelected);
};

const isSelected = (item): boolean => {
  return isItemSelected(modelValue, item);
};

const contains = (arr: Array<any> = [], target: any) => {
  const {
    props: { valueKey },
  } = select;

  if (!isObject(target)) {
    return arr.includes(target);
  }

  return (
    arr &&
    arr.some((item) => {
      return get(item, valueKey) === get(target, valueKey);
    })
  );
};
const isEqual = (selected: unknown, target: unknown) => {
  if (!isObject(target)) {
    return selected === target;
  } else {
    const { valueKey } = select.props;
    return get(selected, valueKey) === get(target, valueKey);
  }
};

const isItemSelected = (modelValue: any[] | any, target: Option) => {
  const { valueKey } = select.props;
  if (select.props.multiple) {
    return contains(select.props.modelValue, get(target, valueKey));
  }

  return (
    isEqual(select.props.modelValue, get(target, valueKey)) ||
    isEqual(select.props.modelValue, target)
  );
};

const isItemDisabled = (modelValue: any[] | any, selected: boolean) => {
  const { disabled, multiple, multipleLimit } = select.props;
  return (
    disabled ||
    (!selected &&
      (multiple
        ? multipleLimit > 0 && select.props.modelValue.length >= multipleLimit
        : false))
  );
};

const isItemHovering = (target: number) => props.hoveringIndex === target;

const { onSelect, onHover } = select;
</script>
