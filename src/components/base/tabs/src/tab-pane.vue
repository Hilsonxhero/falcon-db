<template>
  <!-- <transition :name="ns.b('fade')"> -->
  <div class="www" v-show="active" :id="`pane-${paneName}`" :class="ns.b()" role="tabpanel" :aria-hidden="!active"
    :aria-labelledby="`tab-${paneName}`">
    <slot />
  </div>
  <!-- </transition> -->

</template>
<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useSlots,
  watch,
} from 'vue'
import { eagerComputed } from '@vueuse/core'
import { tabsRootContextKey } from '@/core/tokens'
import { throwError } from '@/core/utils'
import { useNamespace } from '@/core/hooks'
import { tabPaneProps } from './tab-pane'

const COMPONENT_NAME = 'HxTabPane'
defineOptions({
  name: 'HxTabPane',
})
const props = defineProps(tabPaneProps)

const instance = getCurrentInstance()!
const slots = useSlots()

const tabsRoot = inject(tabsRootContextKey)

// if (!tabsRoot)
//   throwError(COMPONENT_NAME, 'usage: <el-tabs><el-tab-pane /></el-tabs/>')

const ns = useNamespace('tab-pane')

const index = ref<string>()
const isClosable = computed(() => props.closable || tabsRoot.props.closable)
const active = eagerComputed(
  () => tabsRoot.currentName.value === (props.name ?? index.value)
)
const loaded = ref(active.value)
const paneName = computed(() => props.name ?? index.value)
const shouldBeRender = eagerComputed(
  () => !props.lazy || loaded.value || active.value
)

watch(active, (val) => {
  if (val) loaded.value = true
})

const pane = reactive({
  uid: instance.uid,
  slots,
  props,
  paneName,
  active,
  index,
  isClosable,
})

onMounted(() => {
  tabsRoot.registerPane(pane)
})

onUnmounted(() => {
  tabsRoot.unregisterPane(pane.uid)
})
</script>

<style lang="scss">
// .www {
//   transition:
//     transform .3s,
// }

// .hx-tab-pane-fade-enter-from {
//   right: 0;
//   transform: translateX(100%);

// }

// .hx-tab-pane-fade-leave-to {
//   opacity: 0;
//   right: 0;
//   transform: translateX(100%);

// }
</style>
