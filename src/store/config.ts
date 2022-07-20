import { defineStore } from "pinia";
import { Actions, Mutations } from "@/store/enums/config";


export interface User {
    username: string;
    email: string;
    password: string;
    token: string;
}

export const useConfigStore = defineStore("auth", {
    state: () => ({
        user: {
            username: "hilson",
            email: "hilson@info.com",
            password: "password",
            token: "access token",
        },
    }),

    getters: {},

    actions: {
        [Actions.LOGIN](credentials) {
            return new Promise<void>((resolve, reject) => {
                // @ts-ignore
                $nuxt.$ApiService
                    .post("register", credentials)
                    .then(({ data }) => {
                        resolve();
                    })
                    .catch(({ response }) => {
                        reject();
                    });
            });
        },
    },
});
