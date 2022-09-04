import { withInstall, withNoopInstall } from "@/core/utils";
import Tabs from "./src/tabs.vue";
import TabPane from "./src/tab-pane.vue";

// export const HxTabs = withInstall(Tabs, { Tabs })

// export default HxTabs

// export const HxTabPane = withInstall(TabPane, { TabPane })

export const HxTabs = withInstall(Tabs, {
  TabPane,
});
export const HxTabPane = withNoopInstall(TabPane);
export default HxTabs;

export * from "./src/tabs";
export * from "./src/tab-pane";
