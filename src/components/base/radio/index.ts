import Radio from "./src/radio-button.vue";
import { withInstall } from "@/core/utils";
export const HxRadio = withInstall(Radio, { name: "HxRadio" });
export default HxRadio;
export * from "./src/radio";
export * from "./src/radio-group";
