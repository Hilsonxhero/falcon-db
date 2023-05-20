// @ts-nocheck
// @ts-ignore

import Dropdown from "./src/dropdown.vue";
import DropdownMenu from "./src/dropdown-menu.vue";
import DropdownItem from "./src/dropdown-item.vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
import type { App } from "vue";

// export const HxDropdown = withInstall(Dropdown, { name: 'HxDropdown' })

// export const HxDropdownMenu = withInstall(DropdownMenu, {
//   name: "HxDropdownMenu",
// });

// export const HxDropdownItem = withInstall(DropdownItem, {
//   name: "HxDropdownItem",
// });

Dropdown.install = (app: App): void => {
  app.component(Dropdown.name, Dropdown);
};
const _Dropdown = Dropdown as SFCWithInstall<typeof Dropdown>;

DropdownMenu.install = (app: App): void => {
  app.component(DropdownMenu.name, DropdownMenu);
};
const _DropdownMenu = DropdownMenu as SFCWithInstall<typeof DropdownMenu>;

DropdownItem.install = (app: App): void => {
  app.component(DropdownItem.name, DropdownItem);
};
const _DropdownItem = DropdownItem as SFCWithInstall<typeof DropdownItem>;

export const HxDropdown = _Dropdown;

export const HxDropdownItem = _DropdownItem;

export const HxDropdownMenu = _DropdownMenu;

export default HxDropdown;
