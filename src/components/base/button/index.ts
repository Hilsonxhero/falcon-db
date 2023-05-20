
// @ts-nocheck
// @ts-ignore
import Button from "./src/button.vue";
import type { App } from "vue";
import { withInstall, SFCWithInstall } from "@/core/utils";

// export const HxButton = withInstall(Button, { name: "HxButton" });
// export default HxButton;

Button.install = (app: App): void => {
  app.component(Button.name, Button);
};
const _Button = Button as SFCWithInstall<typeof Button>;

export const HxButton = _Button;

export default _Button;


export * from "./src/button";
