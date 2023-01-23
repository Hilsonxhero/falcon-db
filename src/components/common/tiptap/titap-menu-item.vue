<template>
    <button type="button" :class="[
        ns.e('menu-item'),
        { 'is-active': isActive ? isActive() : null }
    ]" @click="action" :title="title">
        <hx-icon :icon="icon" class="w-6 h-6 text-gray-500"></hx-icon>
    </button>
</template>

<script lang="ts" setup>
// @ts-nocheck

import { useNamespace } from '@/core/hooks'

const ns = useNamespace('tiptap')

const props = defineProps(
    {
        icon: {
            type: String,
        },
        title: {
            type: String,
        },
        action: {
            type: Function,
        },
        isActive: {
            type: Function,
            default: null,
        },
    }
)

// const www = (): void | Function => {
//     return props.action
// }




</script>

