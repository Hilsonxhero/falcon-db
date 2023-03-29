// @ts-nocheck
import { ref, computed } from "vue";
import ApiService from "@/core/services/ApiService";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null);
    const isLoggedIn = ref(false);
    const checked = ref(false);
    const errors = ref(null);
    const loggedIn = computed(() => isLoggedIn.value);

    const personalInfo = async () => {
        try {
            const { data } = await ApiService.get(`auth/personal-info`);
            user.value = data.data?.user;
        } catch (error) {
            return error;
        }
    };


    const init = async () => {
        if (!checked.value)
            try {
                const { data } = await ApiService.get(`auth/init`);
                user.value = data.data?.user;
                isLoggedIn.value = data.data?.is_logged_in;
                checked.value = true;
            } catch (error) {
                return error;
            }
    };

    const login = async (form) => {
        try {
            checked.value = false;
            const { data } = await ApiService.post(`auth/login/otp`, form);
            isLoggedIn.value = true;
            return data;
        } catch (error) {
            return error;
        }
    };

    const authenticate = async (form) => {
        try {
            const { data } = await ApiService.post(`auth/authenticate`, form);
            return data;
        } catch (error) {
            return error;
        }
    };

    const logout = async () => {
        try {
            checked.value = false;
            const { data } = await ApiService.post(`auth/logout`);
            user.value = null;
            isLoggedIn.value = false;
        } catch (error) {
            return error;
        }
    };

    return {
        user,
        isLoggedIn,
        personalInfo,
        checked,
        errors,
        init,
        login,
        authenticate,
        logout,
        loggedIn
    };
});
