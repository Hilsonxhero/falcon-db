import { createApp } from "vue";
import router from "./router";
// import "./style.css";
import '@/assets/css/tailwind.css'
import App from "./App.vue";

import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import installer from "@/core/installer/index";
import i18n from "@/core/plugins/i18n";

const app = createApp(App);




ApiService.init(app);
installer.install(app);
initInlineSvg(app);
initApexCharts(app)
initVeeValidate(app)

app.use(router);
app.use(i18n);







app.mount("#app");
