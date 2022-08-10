// @ts-nocheck
import { App } from "vue";
import axios from "axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import router from "@/router";
import { createApp } from "vue";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {

    /**
   * @description property to share vue instance
   */
    public static vueInstance: App;

    constructor(app: any) {
        ApiService.vueInstance = app;
        ApiService.vueInstance.axios = axios;
        ApiService.vueInstance.axios.defaults.baseURL = process.env.API_URL
        // ApiService.vueInstance.axios.interceptors.response.use(
        //     response => {
        //         return response;
        //     },
        //     error => {
        //         if (error.response.status == 404) {
        //             console.log("dfgf");
        //             router.push({ name: "not-found" });
        //         }

        //         return Promise.reject(error);
        //     }
        // );
    }


    /**
     * @description initialize vue axios
     */
    public static init(app: App<Element>) {
        // ApiService.vueInstance = app;
        // ApiService.vueInstance.axios = axios;
        // ApiService.vueInstance.axios.defaults.baseURL = process.env.API_URL
        // ApiService.vueInstance.axios.interceptors.response.use(
        //     response => {
        //         return response;
        //     },
        //     error => {
        //         if (error.response.status == 404) {
        //             console.log("dfgf");
        //             router.push({ name: "not-found" });
        //         }

        //         return Promise.reject(error);
        //     }
        // );

    }

    /**
     * @description set the default HTTP request headers
     */
    public static setHeader(): void {

    }

    /**
     * @description send the GET HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static query(
        resource: string,
        params: AxiosRequestConfig
    ): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios.get(resource, params).catch((error) => {
            throw new Error(`ApiService ${error}`);
        });
    }

    /**
     * @description send the GET HTTP request
     * @param resource: string
     * @param slug: string
     * @returns Promise<AxiosResponse>
     */
    public static get(

        resource: string,
        slug = "" as string
    ): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios
            .get(`${resource}`)
        // .catch((error) => {
        //     throw new Error(`ApiService ${error}`);
        // });
    }

    /**
     * @description set the POST HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static post(
        resource: string,
        params: any
    ): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios.post(`${resource}`, params);
    }

    /**
     * @description send the UPDATE HTTP request
     * @param resource: string
     * @param slug: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static update(
        resource: string,
        slug: string,
        params: AxiosRequestConfig
    ): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
    }

    /**
     * @description Send the PUT HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static put(
        resource: string,
        params: AxiosRequestConfig
    ): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios.put(`${resource}`, params);
    }

    /**
     * @description Send the DELETE HTTP request
     * @param resource: string
     * @returns Promise<AxiosResponse>
     */
    public static delete(resource: string): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios.delete(resource).catch((error) => {
            throw new Error(`ApiService ${error}`);
        });
    }
}

const app = createApp({})
new ApiService(app);

export default ApiService;