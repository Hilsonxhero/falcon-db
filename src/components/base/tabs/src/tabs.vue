<template>
  <div class="flex flex-col" role="tablist" aria-multiselectable="true">
    <div :class="[ns.e('header'), ns.is(props.tabPosition)]">
      <TabNav ref="nav" :current-name="currentName" :editable="editable" :type="type" :panes="Object.values(panes)"
        :stretch="stretch" @onTabClick="handleTabClick" />
    </div>

    <div :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, provide, reactive } from "vue";
import { definePropType, isNumber, isString, mutable } from "@/core/utils";
import { ensureArray, isUndefined } from "@/core/utils";
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "@/core/constants";
import type { Arrayable } from "@/core/utils";
import { useNamespace } from '@/core/hooks'
import { collapseContextKey } from "@/core/tokens";
import type { CollapseActiveName } from "./tabs";
import { collapseEmits } from "./tabs";
import { tabsRootContextKey, TabsPaneContext } from '@/core/tokens'
import TabNav from './tab-nav.vue'

export type CollapseModelValue = Arrayable<CollapseActiveName>;
export type TabPanelName = string | number
export type Awaitable<T> = Promise<T> | T
defineOptions({
  name: 'HxTabs',
})

const props = defineProps({
  type: {
    type: String,
    values: ['card', 'border-card', ''],
    default: '',
  },
  activeName: {
    type: [String, Number],
  },
  closable: Boolean,
  addable: Boolean,
  modelValue: {
    type: [String, Number],
  },
  editable: Boolean,
  tabPosition: {
    type: String,
    values: ['top', 'right', 'bottom', 'left'],
    default: 'top',
  },
  beforeLeave: {
    type: definePropType<
      (
        newName: TabPanelName,
        oldName: TabPanelName
      ) => Awaitable<void | boolean>
    >(Function),
    default: () => true,
  },
  stretch: Boolean,
})
const ns = useNamespace('tabs')

const panes = reactive<Record<number, TabsPaneContext>>({})
const currentName = ref<TabPanelName>(
  props.modelValue ?? props.activeName ?? '0'
)

const registerPane = (pane: TabsPaneContext) => (panes[pane.uid] = pane)
const unregisterPane = (uid: number) => delete panes[uid]


const emit = defineEmits([
  UPDATE_MODEL_EVENT,
  'tab-click',
  'tab-change',
  'tab-remove',
  'tab-add',
])

const changeCurrentName = (value: TabPanelName) => {
  currentName.value = value
  emit(UPDATE_MODEL_EVENT, value)
  emit('tab-change', value)
}

const setCurrentName = async (value?: TabPanelName) => {
  // should do nothing.
  if (currentName.value === value || isUndefined(value)) return

  try {
    const canLeave = await props.beforeLeave?.(value, currentName.value)
    if (canLeave !== false) {
      changeCurrentName(value)

      // call exposed function, Vue doesn't support expose in typescript yet.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      nav$.value?.removeFocus?.()
    }
  } catch { }
}


const handleTabClick = (
  tab: TabsPaneContext,
  tabName: TabPanelName,
  event: Event
) => {
  if (tab.props.disabled) return
  setCurrentName(tabName)
  emit('tab-click', tab, event)
}

provide(tabsRootContextKey, {
  props,
  currentName,
  registerPane,
  unregisterPane,
})

</script>

<style scoped>
</style>
