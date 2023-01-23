import Textarea from "./src/textarea.vue";
import type { App } from "vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
// export const HxTextarea = withInstall(Textarea, { name: "HxTextarea" });

Textarea.install = (app: App): void => {
  app.component(Textarea.name, Textarea);
};
const _Textarea = Textarea as SFCWithInstall<typeof Textarea>;

export const HxTextarea = _Textarea;

export default _Textarea;
