import Icon from "./src/icon.vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
import type { App } from "vue";
// export const HxIcon = withInstall(Icon, { name: "HxIcon" });

Icon.install = (app: App): void => {
  app.component(Icon.name, Icon);
};
const _Icon = Icon as SFCWithInstall<typeof Icon>;

export const HxIcon = _Icon;

export default HxIcon;
