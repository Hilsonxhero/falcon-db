import { createApp } from "vue";
import router from "./router";
// import "./style.css";
import '@/assets/css/tailwind.css'
import App from "./App.vue";

import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import installer from "@/core/installer/index";
import i18n from "@/core/plugins/i18n";


const app = createApp(App);


const clickoutside = {
    created(el: any, binding: any, vnode: any) { },

    beforeMount(el: any) { },

    mounted(el: any, binding: any, vnode: any) {
        const parent = `.${binding.arg}`;
        el.handler = (event: any) => {
            if (!event.target.closest(parent) && !el.contains(event.target)) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener("click", el.handler);
        document.body.addEventListener("touchstart", el.handler);
    },
    beforeUpdate() { },
    updated() { },

    beforeUnmount(el: any) {
        document.body.removeEventListener("click", el.handler);
        document.body.removeEventListener("touchstart", el.handler);
    },

    unmounted(event: any) {
        // event.stopPropagation()
    },
};

app.directive("clickoutside", clickoutside);



// const NODE_ENV = 'development';



ApiService.init(app);
installer.install(app);
initInlineSvg(app);
initApexCharts(app)

app.use(router);
app.use(i18n);

app.mount("#app");
