import Input from "./src/input.vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
import type { App } from "vue";
// export const HxInput = withInstall(Input, { name: 'HxInput' })

Input.install = (app: App): void => {
  app.component(Input.name, Input);
};
const _Input = Input as SFCWithInstall<typeof Input>;

export const HxInput = _Input;
export default HxInput;
