import type { App, Plugin } from "@vue/runtime-core";
import { provideGlobalConfig } from '@/core/hooks'
import type { ConfigProviderContext } from '@/core/tokens'

export const makeInstaller = (components: Plugin[] = []) => {
  console.log("components 2", components);

  const install = (app: App, options?: ConfigProviderContext) => {
    // components.forEach((c: any) => app.component(c.name, c));
    components.forEach((c) => app.use(c))
    if (options) provideGlobalConfig(options, app, true)
  };
  return {
    install,
  };
};
