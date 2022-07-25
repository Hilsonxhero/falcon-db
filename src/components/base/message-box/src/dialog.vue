<template>
    <transition name="fade-in-linear" @after-leave="$emit('vanish')">
        <div v-show="visible" :class="`${ns.namespace.value}-overlay-message-box`" @click="overlayEvent.onClick"
            @mousedown="overlayEvent.onMousedown" @mouseup="overlayEvent.onMouseup">

            <div ref="rootRef" :class="[
                ns.b(),
                customClass,
                ns.is('draggable', draggable),
                { [ns.m('center')]: center },
            ]" :style="customStyle" tabindex="-1" @click.stop="">
                <div v-if="title !== null && title !== undefined" ref="headerRef" :class="ns.e('header')">
                    <div class="flex items-center justify-between" :class="ns.e('title')">
                        <!-- <el-icon v-if="iconComponent && center" :class="[ns.e('status'), typeClass]">
                                <component :is="iconComponent" />
                            </el-icon> -->
                        <span class="">{{ title }}</span>
                        <hx-button icon variant="gray" :class="[ns.e('status'), typeClass]"
                            @click="handleAction('close')">
                            <hx-icon icon="close" class="w-6 h-6"></hx-icon>
                        </hx-button>


                    </div>
                    <!-- <button v-if="showClose" type="button" :class="ns.e('headerbtn')"
                        :aria-label="t('el.messagebox.close')" @click="
                            handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
                        " @keydown.prevent.enter="
    handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
">
                        <el-icon :class="ns.e('close')">
                                <close />
                            </el-icon>
                    </button> -->
                </div>
                <div :id="contentId" :class="ns.e('content')">
                    <div :class="ns.e('container')">
                        <!-- <el-icon v-if="iconComponent && !center && hasMessage" :class="[ns.e('status'), typeClass]">
                                <component :is="iconComponent" />
                            </el-icon> -->
                        <div v-if="hasMessage" :class="ns.e('message')">
                            <slot>
                                <!-- <component :is="showInput ? 'label' : 'p'" v-if="!dangerouslyUseHTMLString"
                                        :for="showInput ? inputId : undefined">
                                        {{ !dangerouslyUseHTMLString ? message : '' }}
                                    </component>
                                    <component :is="showInput ? 'label' : 'p'" v-else
                                        :for="showInput ? inputId : undefined" v-html="message" /> -->
                                <div class="text-right">{{ message }}</div>
                            </slot>
                        </div>
                    </div>
                    <div v-show="showInput" :class="ns.e('input')">
                        <!-- <el-input :id="inputId" ref="inputRef" v-model="inputValue" :type="inputType"
                                :placeholder="inputPlaceholder" :aria-invalid="validateError"
                                :class="{ invalid: validateError }" @keydown.enter="handleInputEnter" /> -->
                        <div :class="ns.e('errormsg')" :style="{
                            visibility: !!editorErrorMessage ? 'visible' : 'hidden',
                        }">
                            {{ editorErrorMessage }}
                        </div>
                    </div>
                </div>
                <div :class="ns.e('btns')">

                    <hx-button class="ml-3" v-show="showConfirmButton" ref="confirmRef" variant="primary"
                        :class="[confirmButtonClasses]" :disabled="confirmButtonDisabled" :size="btnSize"
                        @click="handleAction('confirm')" @keydown.prevent.enter="handleAction('confirm')">
                        {{ confirmButtonText || t('el.messagebox.confirm') }}
                    </hx-button>

                    <hx-button variant="light" v-if="showCancelButton" :loading="cancelButtonLoading"
                        :class="[cancelButtonClass]" @click="handleAction('cancel')"
                        @keydown.prevent.enter="handleAction('cancel')">
                        {{ cancelButtonText || t('el.messagebox.cancel') }}
                    </hx-button>



                </div>
            </div>
            <hx-overlay :active="visible"></hx-overlay>
        </div>
    </transition>

</template>
<script lang="ts">
// @ts-nocheck
import {
    computed,
    defineComponent,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    toRefs,
    watch,

} from 'vue'


import {

    useId,
    useLocale,
    useLockscreen,
    useNamespace,
    useRestoreActive,
    useSameTarget,
    useSize,
    useZIndex,
} from '@/core/hooks'

import { HxBackDrop } from '@/components/base/backdrop'


import {
    TypeComponents,
    off,
    on,
} from '@/core/utils'

import type { ComponentPublicInstance, PropType } from 'vue'
import type { ComponentSize } from '@/core/constants'
import type {
    Action,
    MessageBoxState,
    MessageBoxType,
} from './message-box.type'

export default defineComponent({
    name: 'HxMessageBox',

    components: {
        HxBackDrop
    },
    inheritAttrs: false,
    props: {
        buttonSize: {
            type: String as PropType<ComponentSize>,

        },
        modal: {
            type: Boolean,
            default: true,
        },
        lockScroll: {
            type: Boolean,
            default: true,
        },
        showClose: {
            type: Boolean,
            default: true,
        },
        closeOnClickModal: {
            type: Boolean,
            default: true,
        },
        closeOnPressEscape: {
            type: Boolean,
            default: true,
        },
        closeOnHashChange: {
            type: Boolean,
            default: true,
        },
        center: Boolean,
        draggable: Boolean,
        roundButton: {
            default: false,
            type: Boolean,
        },
        container: {
            type: String, // default append to body
            default: 'body',
        },
        boxType: {
            type: String as PropType<MessageBoxType>,
            default: '',
        },
    },
    emits: ['vanish', 'action'],
    setup(props, { emit }) {
        // const popup = usePopup(props, doClose)
        const { t } = useLocale()
        const ns = useNamespace('message-box')
        const visible = ref(false)
        const { nextZIndex } = useZIndex()
        // s represents state
        const state = reactive<MessageBoxState>({
            // autofocus element when open message-box
            autofocus: true,
            beforeClose: null,
            callback: null,
            cancelButtonText: '',
            cancelButtonClass: '',
            confirmButtonText: '',
            confirmButtonClass: '',
            customClass: '',
            customStyle: {},
            dangerouslyUseHTMLString: false,
            distinguishCancelAndClose: false,
            icon: '',
            inputPattern: null,
            inputPlaceholder: '',
            inputType: 'text',
            inputValue: null,
            inputValidator: null,
            inputErrorMessage: '',
            message: null,
            modalFade: true,
            modalClass: '',
            showCancelButton: false,
            showConfirmButton: true,
            type: '',
            title: undefined,
            showInput: false,
            action: '' as Action,
            confirmButtonLoading: false,
            cancelButtonLoading: false,
            confirmButtonDisabled: false,
            editorErrorMessage: '',
            // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
            // seemed ok for now without this state.
            // isOnComposition: false, // temporary remove
            validateError: false,
            zIndex: nextZIndex(),
        })

        const typeClass = computed(() => {
            // const type = state.type
            // return { [ns.bm('icon', type)]: type && TypeComponentsMap[type] }
            return ''
        })

        const contentId = useId()
        const inputId = useId()

        const btnSize = 'test'

        // const iconComponent = computed(
        //     () => state.icon || TypeComponentsMap[state.type] || ''
        // )



        const hasMessage = computed(() => !!state.message)
        const rootRef = ref<HTMLElement>()
        const headerRef = ref<HTMLElement>()
        const focusStartRef = ref<HTMLElement>()
        const inputRef = ref<ComponentPublicInstance>()
        const confirmRef = ref<ComponentPublicInstance>()

        const confirmButtonClasses = computed(() => state.confirmButtonClass)

        watch(
            () => state.inputValue,
            async (val) => {
                await nextTick()
                if (props.boxType === 'prompt' && val !== null) {
                    validate()
                }
            },
            { immediate: true }
        )

        watch(
            () => visible.value,
            (val) => {
                if (val) {
                    if (props.boxType !== 'prompt') {
                        if (state.autofocus) {
                            focusStartRef.value = confirmRef.value?.$el ?? rootRef.value
                        } else {
                            focusStartRef.value = rootRef.value
                        }
                    }
                    state.zIndex = nextZIndex()
                }
                if (props.boxType !== 'prompt') return
                if (val) {
                    nextTick().then(() => {
                        if (inputRef.value && inputRef.value.$el) {
                            if (state.autofocus) {
                                focusStartRef.value = getInputElement() ?? rootRef.value
                            } else {
                                focusStartRef.value = rootRef.value
                            }
                        }
                    })
                } else {
                    state.editorErrorMessage = ''
                    state.validateError = false
                }
            }
        )

        // const draggable = computed(() => props.draggable)
        // useDraggable(rootRef, headerRef, draggable)

        onMounted(async () => {
            await nextTick()
            if (props.closeOnHashChange) {
                on(window, 'hashchange', doClose)
            }
        })

        onBeforeUnmount(() => {
            if (props.closeOnHashChange) {
                off(window, 'hashchange', doClose)
            }
        })

        function doClose() {
            if (!visible.value) return
            visible.value = false
            nextTick(() => {
                if (state.action) emit('action', state.action)
            })
        }

        const handleWrapperClick = () => {
            if (props.closeOnClickModal) {
                handleAction(state.distinguishCancelAndClose ? 'close' : 'cancel')
            }
        }

        const overlayEvent = useSameTarget(handleWrapperClick)

        const handleInputEnter = (e: KeyboardEvent) => {
            if (state.inputType !== 'textarea') {
                e.preventDefault()
                return handleAction('confirm')
            }
        }

        const handleAction = (action: Action) => {
            if (props.boxType === 'prompt' && action === 'confirm' && !validate()) {
                return
            }

            state.action = action

            if (state.beforeClose) {
                state.beforeClose?.(action, state, doClose)
            } else {
                doClose()
            }
        }

        const validate = () => {
            if (props.boxType === 'prompt') {
                const inputPattern = state.inputPattern
                if (inputPattern && !inputPattern.test(state.inputValue || '')) {
                    state.editorErrorMessage =
                        state.inputErrorMessage || t('el.messagebox.error')
                    state.validateError = true
                    return false
                }
                const inputValidator = state.inputValidator
                if (typeof inputValidator === 'function') {
                    const validateResult = inputValidator(state.inputValue)
                    if (validateResult === false) {
                        state.editorErrorMessage =
                            state.inputErrorMessage || t('el.messagebox.error')
                        state.validateError = true
                        return false
                    }
                    if (typeof validateResult === 'string') {
                        state.editorErrorMessage = validateResult
                        state.validateError = true
                        return false
                    }
                }
            }
            state.editorErrorMessage = ''
            state.validateError = false
            return true
        }

        const getInputElement = () => {
            const inputRefs = inputRef.value.$refs
            return (inputRefs.input || inputRefs.textarea) as HTMLElement
        }

        const handleClose = () => {
            handleAction('close')
        }

        const onCloseRequested = () => {
            if (props.closeOnPressEscape) {
                handleClose()
            }
        }

        // locks the screen to prevent scroll
        if (props.lockScroll) {
            useLockscreen(visible)
        }

        // restore to prev active element.
        useRestoreActive(visible)

        return {
            ...toRefs(state),
            ns,
            overlayEvent,
            visible,
            hasMessage,
            typeClass,
            contentId,
            inputId,
            btnSize,
            confirmButtonClasses,
            rootRef,
            focusStartRef,
            headerRef,
            inputRef,
            confirmRef,
            doClose, // for outside usage
            handleClose, // for out side usage
            onCloseRequested,
            handleWrapperClick,
            handleInputEnter,
            handleAction,
            t,
        }
    },
})
</script>
