import Switch from "./src/switch.vue";
import type { App } from "vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
// export const HxSwitch = withInstall(Switch, { name: "HxSwitch" });

Switch.install = (app: App): void => {
  app.component(Switch.name, Switch);
};
const _Switch = Switch as SFCWithInstall<typeof Switch>;

export const HxSwitch = _Switch;

export default _Switch;
