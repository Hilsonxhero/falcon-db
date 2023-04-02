import { HxInfiniteScroll } from "@/components/base/infinite-scroll";
import { HxMessageBox } from "@/components/base/message-box";
import { HxMessage } from '@/components/base/message'
import { HxNotification } from "@/components/base/notification";
import { HxPopoverDirective } from '@/components/base/popover'

import type { Plugin } from "vue";

export default [HxMessageBox, HxMessage, HxNotification, HxInfiniteScroll, HxPopoverDirective] as Plugin[];
