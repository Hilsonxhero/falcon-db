import Modal from "./src/modal.vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
import type { App } from "vue";
// export const HxModal = withInstall(Modal, { name: 'HxModal' })

Modal.install = (app: App): void => {
  app.component(Modal.name, Modal);
};
const _Modal = Modal as SFCWithInstall<typeof Modal>;

export const HxModal = _Modal;

export default _Modal;
