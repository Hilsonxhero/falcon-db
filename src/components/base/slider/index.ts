import Slider from "./src/slider.vue";
import type { App } from "vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
// export const HxSlider = withInstall(Slider, { name: "HxSlider" });

Slider.install = (app: App): void => {
  app.component(Slider.name, Slider);
};
const _Slider = Slider as SFCWithInstall<typeof Slider>;

export const HxSlider = _Slider;

export default _Slider;
