
<template>
    <div ref="el" :class="[ns.e('nav-wrap'),
    ns.is('scrollable', true),
    ns.is('top')
    ]">



        <div :class="[
            ns.e('nav-scroll')
        ]" ref="navScroll">

            <div class="flex items-center space-x-reverse space-x-5" :class="[ns.e('nav'), ns.is(rootTabs.props.tabPosition), ns.is('stretch', props.stretch &&
            ['top', 'bottom'].includes(rootTabs.props.tabPosition))]" ref="nav" role="tablist">


                <!-- <TabBar :tabs="[...props.panes]" /> -->

                <div v-for="(pane, index) in panes" :ref="`tab-${pane.props.name}`" :class="
                    [ns.e('item'), ns.is(rootTabs.props.tabPosition),
                    ns.is('active', pane.active), ns.is('closable', closable(pane))]
                " :id="`tab-${pane.props.name}`" :key="`tab-${pane.props.name}`"
                    :aria-controls="`pane-${pane.props.name}`" role="tab" :aria-selected="pane.active" tabindex="0"
                    @click="handleClick($event, pane)">
                    {{ pane.props.label }}
                </div>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import {
    computed,
    defineComponent,
    getCurrentInstance,
    inject,
    nextTick,
    onMounted,
    onUpdated,
    ref,
    watch,
} from 'vue'
import { NOOP } from '@vue/shared'

import { useNamespace } from '@/core/hooks'
import TabBar from './tab-bar.vue'
import type { TabsPaneContext } from '@/core/tokens'
import { tabsRootContextKey } from '@/core/tokens'

export type TabPanelName = string | number

import {
    useDocumentVisibility,
    useResizeObserver,
    useWindowFocus,
} from '@vueuse/core'

import {
    buildProps,
    capitalize,
    definePropType,
    mutable,
    throwError,
} from '@/core/utils'


const emit = defineEmits(['onTabClick'])


const props = defineProps({
    panes: {
        type: definePropType<TabsPaneContext[]>(Array),
        default: () => mutable([] as const),
    },
    currentName: {
        type: [String, Number],
        default: '',
    },
    editable: Boolean,
    onTabClick: {
        type: definePropType<
            (tab: TabsPaneContext, tabName: TabPanelName, ev: Event) => void
        >(Function),
        default: NOOP,
    },
    onTabRemove: {
        type: definePropType<(tab: TabsPaneContext, ev: Event) => void>(Function),
        default: NOOP,
    },
    type: {
        type: String,
        values: ['card', 'border-card', ''],
        default: '',
    },
    stretch: Boolean,
})

const ns = useNamespace('tabs')

const navScroll = ref<HTMLDivElement>()
const nav = ref<HTMLDivElement>()
const el = ref<HTMLDivElement>()

const closable = (pane) => (pane.isClosable || props.editable)

const tabName = (pane) => pane.props.name ?? pane.index

const rootTabs = inject(tabsRootContextKey)

const handleClick = (ev: MouseEvent, pane) => {
    // removeFocus()
    // props.onTabClick(pane, tabName(pane), ev)

    emit('onTabClick', pane, tabName(pane), ev)
}

</script>

<style scoped>
</style>