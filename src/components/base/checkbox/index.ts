// @ts-nocheck
// @ts-ignore
import Checkbox from "./src/checkbox.vue";
import CheckboxButton from "./src/checkbox-button.vue";
import CheckboxGroup from "./src/checkbox-group.vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
import type { App } from "vue";

// export const HxCheckbox = withInstall(Checkbox, { name: "HxCheckbox" });

Checkbox.install = (app: App): void => {
  app.component(Checkbox.name, Checkbox);
};
const _Checkbox = Checkbox as SFCWithInstall<typeof Checkbox>;

export const HxCheckbox = _Checkbox;

CheckboxGroup.install = (app: App): void => {
  app.component(CheckboxGroup.name, CheckboxGroup);
};
const _CheckboxGroup = CheckboxGroup as SFCWithInstall<typeof CheckboxGroup>;

export default _Checkbox;
export const HxCheckboxGroup = _CheckboxGroup;

// export const HxCheckboxGroup = withInstall(CheckboxGroup, {
//   name: "HxCheckboxGroup",
// });

// export default HxCheckbox;
