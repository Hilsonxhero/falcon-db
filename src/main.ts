import { createApp } from "vue";
import router from "./router";
import '@/assets/css/tailwind.css'
import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();

import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import installer from "@/core/installer/index";
// import i18n from "@/core/plugins/i18n";

const app = createApp(App);

app.config.globalProperties.$filters = {
    twoDigits(value) {
        if (value.toString().length <= 1) {
            return "0" + value.toString();
        }
        return value.toString();
    },
    separate(Number) {
        const value = Number / 10
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
};

app.directive('focus', {
    // When the bound element is mounted into the DOM...
    mounted(el) {
        // Focus the element
        el.focus()
    }
})


ApiService.init(app);
installer.install(app);
initInlineSvg(app);
initApexCharts(app)
initVeeValidate(app)
app.use(pinia);
app.use(router);
// app.use(i18n);

app.mount("#app");
