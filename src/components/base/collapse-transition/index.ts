import CollapseTransition from "./src/collapse-transition.vue";
import type { App } from "vue";
import { withInstall, withNoopInstall, SFCWithInstall } from "@/core/utils";

CollapseTransition.install = (app: App): void => {
  app.component("HxCollapseTransition", CollapseTransition);
};

const _CollapseTransition = CollapseTransition as SFCWithInstall<
  typeof CollapseTransition
>;

// export const HxCollapseTransition = withInstall(CollapseTransition, { CollapseTransition, name: 'HxCollapseTransition' })

export default _CollapseTransition;
export const HxCollapseTransition = _CollapseTransition;
