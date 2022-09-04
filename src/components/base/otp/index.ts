import Otp from "./src/otp.vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
import type { App } from "vue";
// export const HxOtp = withInstall(Otp, { name: 'HxOtp' })

Otp.install = (app: App): void => {
  app.component(Otp.name, Otp);
};
const _Otp = Otp as SFCWithInstall<typeof Otp>;

export const HxOtp = _Otp;

export default _Otp;
