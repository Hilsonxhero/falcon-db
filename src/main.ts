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
import { ClickOutside } from '@/core/directives'
const app = createApp(App);

app.directive('click-outside', ClickOutside)

// import VueClickAway from "vue3-click-away";

// app.use(VueClickAway)

const clickEventType = function () {
    return document.ontouchstart !== null ? "click" : "touchstart";
};

const UNIQUE_ID = "__vue_click_away__";

const onMounted = function (el: any, binding: any, vnode: any) {
    onUnmounted(el);
    let vm = vnode.context;
    let callback = binding.value;
    let nextTick = false;
    setTimeout(function () {
        nextTick = true;
    }, 0);

    el[UNIQUE_ID] = function (event: any) {
        if ((!el || !el.contains(event.target)) && callback && nextTick && typeof callback === "function") {
            return callback.call(vm, event);
        }
    };

    document.addEventListener(clickEventType(), el[UNIQUE_ID], false);
};

const onUnmounted = function (el) {
    document.removeEventListener(clickEventType(), el[UNIQUE_ID], false);
    delete el[UNIQUE_ID];
};

const onUpdated = function (el: any, binding: any, vnode: any) {
    if (binding.value === binding.oldValue) {
        return;
    }
    onMounted(el, binding, vnode);
};


const directive = {
    mounted: onMounted,
    updated: onUpdated,
    unmounted: onUnmounted
};

// app.directive('click-outside', directive);

ApiService.init(app);
installer.install(app);
initInlineSvg(app);
initApexCharts(app)

app.use(router);
app.use(i18n);

app.mount("#app");
