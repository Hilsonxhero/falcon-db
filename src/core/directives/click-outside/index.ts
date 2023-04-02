

// import type {
//     DirectiveBinding,
// } from 'vue'


// const clickEventType = function () {
//     return document.ontouchstart !== null ? "click" : "touchstart";
// };

// const UNIQUE_ID = "__vue_click_outside__";

// const onMounted = function (el: HTMLElement, binding: DirectiveBinding, vnode: any) {
//     onUnmounted(el);
//     let vm = vnode.context;
//     let callback = binding.value;
//     let nextTick = false;
//     setTimeout(function () {
//         nextTick = true;
//     }, 0);

//     el[UNIQUE_ID] = function (event: any) {
//         if ((!el || !el.contains(event.target)) && callback && nextTick && typeof callback === "function") {
//             return callback.call(vm, event);
//         }
//     };

//     document.addEventListener(clickEventType(), el[UNIQUE_ID], false);
// };

// const onUnmounted = function (el: HTMLElement) {
//     document.removeEventListener(clickEventType(), el[UNIQUE_ID], false);
//     delete el[UNIQUE_ID];
// };

// const onUpdated = function (el: HTMLElement, binding: DirectiveBinding, vnode: any) {
//     if (binding.value === binding.oldValue) {
//         return;
//     }
//     onMounted(el, binding, vnode);
// };


// const ClickOutSide = {
//     mounted: onMounted,
//     updated: onUpdated,
//     unmounted: onUnmounted
// };

// export default ClickOutSide


import { isClient } from '@vueuse/core'
import { isElement } from '@/core/utils'

import type {
    ComponentPublicInstance,
    DirectiveBinding,
    ObjectDirective,
} from 'vue'

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void
type FlushList = Map<
    HTMLElement,
    {
        documentHandler: DocumentHandler
        bindingFn: (...args: unknown[]) => unknown
    }[]
>

const nodeList: FlushList = new Map()

let startClick: MouseEvent

if (isClient) {
    document.addEventListener('mousedown', (e: MouseEvent) => (startClick = e))
    document.addEventListener('mouseup', (e: MouseEvent) => {
        for (const handlers of nodeList.values()) {
            for (const { documentHandler } of handlers) {
                documentHandler(e as MouseEvent, startClick)
            }
        }
    })
}

function createDocumentHandler(
    el: HTMLElement,
    binding: DirectiveBinding
): DocumentHandler {
    let excludes: HTMLElement[] = []
    if (Array.isArray(binding.arg)) {
        excludes = binding.arg
    } else if (isElement(binding.arg)) {
        // due to current implementation on binding type is wrong the type casting is necessary here
        excludes.push(binding.arg as unknown as HTMLElement)
    }
    return function (mouseup, mousedown) {
        const popperRef = (
            binding.instance as ComponentPublicInstance<{
                popperRef: HTMLElement
            }>
        ).popperRef
        const mouseUpTarget = mouseup.target as Node
        const mouseDownTarget = mousedown?.target as Node
        const isBound = !binding || !binding.instance
        const isTargetExists = !mouseUpTarget || !mouseDownTarget
        const isContainedByEl =
            el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
        const isSelf = el === mouseUpTarget

        const isTargetExcluded =
            (excludes.length &&
                excludes.some((item) => item?.contains(mouseUpTarget))) ||
            (excludes.length && excludes.includes(mouseDownTarget as HTMLElement))
        const isContainedByPopper =
            popperRef &&
            (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
        if (
            isBound ||
            isTargetExists ||
            isContainedByEl ||
            isSelf ||
            isTargetExcluded ||
            isContainedByPopper
        ) {
            return
        }
        binding.value(mouseup, mousedown)
    }
}

const ClickOutside: ObjectDirective = {
    beforeMount(el: HTMLElement, binding: DirectiveBinding) {
        // there could be multiple handlers on the element
        if (!nodeList.has(el)) {
            nodeList.set(el, [])
        }

        nodeList.get(el)!.push({
            documentHandler: createDocumentHandler(el, binding),
            bindingFn: binding.value,
        })
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        if (!nodeList.has(el)) {
            nodeList.set(el, [])
        }

        const handlers = nodeList.get(el)!
        const oldHandlerIndex = handlers.findIndex(
            (item) => item.bindingFn === binding.oldValue
        )
        const newHandler = {
            documentHandler: createDocumentHandler(el, binding),
            bindingFn: binding.value,
        }

        if (oldHandlerIndex >= 0) {
            // replace the old handler to the new handler
            handlers.splice(oldHandlerIndex, 1, newHandler)
        } else {
            handlers.push(newHandler)
        }
    },
    unmounted(el: HTMLElement) {
        // remove all listeners when a component unmounted
        nodeList.delete(el)
    },
}

export default ClickOutside
