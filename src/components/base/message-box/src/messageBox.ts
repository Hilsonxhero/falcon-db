// @ts-nocheck
import { h, render, watch } from 'vue'
import { isClient } from '@vueuse/core'
import {
  hasOwn,
  isObject,
  isString,
  isUndefined,
  isVNode,
} from '@/core/utils'
import MessageBoxConstructor from './dialog.vue'



import type { AppContext, ComponentPublicInstance, VNode } from 'vue'
import type {
  Action,
  Callback,
  ElMessageBoxOptions,
  IElMessageBox,
  MessageBoxData,
  MessageBoxState,
} from './message-box.type'

// component default merge props & data

const messageInstance = new Map<
  ComponentPublicInstance<{ doClose: () => void }>, // marking doClose as function
  {
    options: any
    callback: Callback
    resolve: (res: any) => void
    reject: (reason?: any) => void
  }
>()

const initInstance = (
  props: any,
  container: HTMLElement,
  appContext: AppContext | null = null
) => {
  const vnode = h(MessageBoxConstructor, props)
  vnode.appContext = appContext
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
  return vnode.component
}

const genContainer = () => {
  return document.createElement('div')
}

const showMessage = (options: any, appContext?: AppContext | null) => {
  const container = genContainer()

  options.onVanish = () => {
    render(null, container)
    messageInstance.delete(vm)

  }
  options.onAction = (action: Action) => {
    const currentMsg = messageInstance.get(vm)!
    let resolve: Action | { value: string; action: Action }
    if (options.showInput) {
      resolve = { value: vm.inputValue, action }
    } else {
      resolve = action
    }
    if (options.callback) {
      options.callback(resolve, instance.proxy)
    } else {
      if (action === 'cancel' || action === 'close') {
        if (options.distinguishCancelAndClose && action !== 'cancel') {
          currentMsg.reject('close')
        } else {
          currentMsg.reject('cancel')
        }
      } else {
        currentMsg.resolve(resolve)
      }
    }
  }

  const instance = initInstance(options, container, appContext)!

  // This is how we use message box programmably.
  // Maybe consider releasing a template version?
  // get component instance like v2.
  const vm = instance.proxy as ComponentPublicInstance<
    {
      visible: boolean
      doClose: () => void
    } & MessageBoxState
  >
  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
      vm[prop as string] = options[prop]
    }
  }

  watch(
    () => vm.message,
    (newVal, oldVal) => {
      if (isVNode(newVal)) {
        // Override slots since message is vnode type.
        instance.slots.default = () => [newVal]
      } else if (isVNode(oldVal) && !isVNode(newVal)) {
        delete instance.slots.default
      }
    },
    {
      immediate: true,
    }
  )

  // change visibility after everything is settled
  vm.visible = true
  return vm
}

async function MessageBox(
  options: ElMessageBoxOptions,
  appContext?: AppContext | null
): Promise<MessageBoxData>
function MessageBox(
  options: ElMessageBoxOptions | string | VNode,
  appContext: AppContext | null = null
): Promise<{ value: string; action: Action } | Action> {
  if (!isClient) return Promise.reject()
  let callback
  if (isString(options) || isVNode(options)) {
    options = {
      message: options,
    }
  } else {
    callback = options.callback
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(options, appContext ?? MessageBox._context)
    // collect this vm in order to handle upcoming events.
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject,
    })
  })
}

const MESSAGE_BOX_VARIANTS = ['alert', 'confirm', 'prompt'] as const
const MESSAGE_BOX_DEFAULT_OPTS: Record<
  typeof MESSAGE_BOX_VARIANTS[number],
  Partial<ElMessageBoxOptions>
> = {
  alert: { closeOnPressEscape: false, closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true },
}

MESSAGE_BOX_VARIANTS.forEach((boxType) => {
  MessageBox[boxType] = messageBoxFactory(boxType)
})

function messageBoxFactory(boxType: typeof MESSAGE_BOX_VARIANTS[number]) {
  return (
    message: string,
    titleOrOpts: string | ElMessageBoxOptions,
    options?: ElMessageBoxOptions,
    appContext?: AppContext | null
  ) => {
    let title: string
    if (isObject(titleOrOpts)) {
      options = titleOrOpts
      title = ''
    } else if (isUndefined(titleOrOpts)) {
      title = ''
    } else {
      title = titleOrOpts
    }

    return MessageBox(
      Object.assign(
        {
          title,
          message,
          type: '',
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
        },
        options,
        {
          boxType,
        }
      ),
      appContext
    )
  }
}

MessageBox.close = () => {
  messageInstance.forEach((_, vm) => {
    vm.doClose()
  })

  messageInstance.clear()
}

MessageBox._context = null

export default MessageBox as IElMessageBox
