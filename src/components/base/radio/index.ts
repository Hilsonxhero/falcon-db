import Radio from "./src/radio-button.vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
import type { App } from "vue";
// export const HxRadio = withInstall(Radio, { name: "HxRadio" });

Radio.install = (app: App): void => {
  app.component(Radio.name, Radio);
};
const _Radio = Radio as SFCWithInstall<typeof Radio>;

export const HxRadio = _Radio;

export default _Radio;
export * from "./src/radio";
export * from "./src/radio-group";
