import type { App } from "@vue/runtime-core";
import { withInstall, withNoopInstall } from "@/core/utils";
import Collapse from "./src/collapse.vue";
import CollapseItem from "./src/collapse-item.vue";
import type { SFCWithInstall } from "@/core/utils";

Collapse.install = (app: App): void => {
  app.component(Collapse.name, Collapse);
};
const _Collapse = Collapse as SFCWithInstall<typeof Collapse>;

export default _Collapse;
export const HxCollapse = _Collapse;

CollapseItem.install = (app: App): void => {
  app.component(CollapseItem.name, CollapseItem);
};

const _CollapseItem = CollapseItem as SFCWithInstall<typeof CollapseItem>;
export const HxCollapseItem = _CollapseItem;

export * from "./src/collapse";
