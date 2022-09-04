import Badge from "./src/badge.vue";
import type { App } from "vue";
import { withInstall, SFCWithInstall } from "@/core/utils";

Badge.install = (app: App): void => {
  app.component(Badge.name, Badge);
};
const _Badge = Badge as SFCWithInstall<typeof Badge>;

export default _Badge;
export const HxBadge = _Badge;
//   export const HxBadge = withInstall(Badge, { name: 'HxBadge' })
// export default HxBadge
