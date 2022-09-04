import FormGroup from "./src/group.vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
import type { App } from "vue";
// export const HxFormGroup = withInstall(FormGroup, { name: 'HxFormGroup' })

FormGroup.install = (app: App): void => {
  app.component(FormGroup.name, FormGroup);
};
const _FormGroup = FormGroup as SFCWithInstall<typeof FormGroup>;

export const HxFormGroup = _FormGroup;

export default HxFormGroup;
