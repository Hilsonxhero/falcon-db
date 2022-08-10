import Checkbox from "./src/checkbox.vue";
import CheckboxButton from "./src/checkbox-button.vue";
import CheckboxGroup from "./src/checkbox-group.vue";
import { withInstall } from "@/core/utils";

export const HxCheckbox = withInstall(Checkbox, { name: "HxCheckbox" });
export const HxCheckboxGroup = withInstall(CheckboxGroup, { name: "HxCheckboxGroup" });

export default HxCheckbox;
