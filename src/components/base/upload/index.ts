import Upload from "./src/upload.vue";
import type { App } from "vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
// export const HxUpload = withInstall(Upload, { name: "HxUpload" });

Upload.install = (app: App): void => {
  app.component(Upload.name, Upload);
};
const _Upload = Upload as SFCWithInstall<typeof Upload>;

export const HxUpload = _Upload;

export default _Upload;
