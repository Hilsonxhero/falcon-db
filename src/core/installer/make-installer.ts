import type { App, Plugin } from "@vue/runtime-core";

export const makeInstaller = (components: any) => {
  console.log("components", components);

  const install = (app: App) => {
    components.forEach((c: any) => app.component(c.name, c));
  };
  return {
    install,
  };
};
