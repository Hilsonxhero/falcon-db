import type { App, Plugin } from "@vue/runtime-core";
import { provideGlobalConfig } from '@/core/hooks'
import type { ConfigProviderContext } from '@/core/tokens'


export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: ConfigProviderContext) => {
    if (app['INSTALLED_KEY']) return
    app['INSTALLED_KEY'] = true
    components.forEach((c: any) => {
      // app.component(c.name, c)
      app.use(c)
    });

    if (options) provideGlobalConfig(options, app, true)
  };
  return {
    install,
  };
};
