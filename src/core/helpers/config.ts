import { computed } from "vue";
import { useConfigStore } from "@/store/config";

/**
 * Returns layout config
 * @returns {object}
 */
export const config = computed(() => {
    // return useConfigStore.getters.layoutConfig();
    return {};
});

/**
 * Set the sidebar display
 * @returns {boolean}
 */
export const displaySidebar = computed(() => {
    // return useConfigStore.getters.layoutConfig("sidebar.display");
    return true;
});

/**
 * Check if footer container is fluid
 * @returns {boolean}
 */
export const footerWidthFluid = computed(() => {

    // return useConfigStore.getters.layoutConfig("footer.width") === "fluid";
    return false;
});

/**
 * Check if header container is fluid
 * @returns {boolean}
 */
export const headerWidthFluid = computed(() => {
    // return useConfigStore.getters.layoutConfig("header.width") === "fluid";
    return true;
});

/**
 * Returns header left part type
 * @returns {string}
 */
export const headerLeft = computed(() => {
    // return useConfigStore.getters.layoutConfig("header.left");
    return true;
});

/**
 * Set the aside display
 * @returns {boolean}
 */
export const asideDisplay = computed(() => {
    // return useConfigStore.getters.layoutConfig("aside.display") === true;
    return true;
});

/**
 * Check if toolbar width is fluid
 * @returns {boolean}
 */
export const toolbarWidthFluid = computed(() => {
    // return useConfigStore.getters.layoutConfig("toolbar.width") === "fluid";
    return true;
});

/**
 * Set the toolbar display
 * @returns {boolean}
 */
export const toolbarDisplay = computed(() => {
    // return useConfigStore.getters.layoutConfig("toolbar.display");
    return true;
});

/**
 * Check if the page loader is enabled
 * @returns {boolean}
 */
export const loaderEnabled = computed(() => {
    // return useConfigStore.getters.layoutConfig("loader.display");
    return true;
});

/**
 * Check if container width is fluid
 * @returns {boolean}
 */
export const contentWidthFluid = computed(() => {
    // return useConfigStore.getters.layoutConfig("content.width") === "fluid";
    return false;
});

/**
 * Page loader logo image
 * @returns {string}
 */
export const loaderLogo = computed(() => {
    // return process.env.BASE_URL + useConfigStore.getters.layoutConfig("loader.logo");
    return '';
});

/**
 * Check if the aside menu is enabled
 * @returns {boolean}
 */
export const asideEnabled = computed(() => {
    // return !!useConfigStore.getters.layoutConfig("aside.display");
    return true;
});

/**
 * Set the aside theme
 * @returns {string}
 */
export const asideTheme = computed(() => {
    // return useConfigStore.getters.layoutConfig("aside.theme");
    return 'light';

});

/**
 * Set the subheader display
 * @returns {boolean}
 */
export const subheaderDisplay = computed(() => {
    // return useConfigStore.getters.layoutConfig("toolbar.display");
    return true;
});



/**
 * Light theme logo image
 * @returns {string}
 */
export const themeLightLogo = computed(() => {
    // return useConfigStore.getters.layoutConfig("main.logo.light");
    return '';
});

/**
 * Dark theme logo image
 * @returns {string}
 */
export const themeDarkLogo = computed(() => {
    // return useConfigStore.getters.layoutConfig("main.logo.dark");
    return '';
});

