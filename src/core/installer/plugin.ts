import { HxInfiniteScroll } from "@/components/base/infinite-scroll";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import type { Plugin } from "vue";

export default [HxMessageBox, HxNotification, HxInfiniteScroll] as Plugin[];
