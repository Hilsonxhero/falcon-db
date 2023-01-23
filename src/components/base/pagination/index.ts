//@ts-nocheck
import Pagination from "./src/pagination.ts";
import type { App } from "vue";
import { withInstall, SFCWithInstall } from "@/core/utils";
// export const HxPagination = withInstall(Pagination, { name: "HxPagination" });

Pagination.install = (app: App): void => {
  app.component(Pagination.name, Pagination);
};
const _Pagination = Pagination as SFCWithInstall<typeof Pagination>;

export const HxPagination = _Pagination;

export default _Pagination;
