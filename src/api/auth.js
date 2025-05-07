import { AUTH_URL_LOGIN, AUTH_URL_LOGOUT, AUTH_URL_REGISTER } from "../common/constants/api";
import apiClient from "./apiClient";


export const register = async (formData) => {
    try {
        const response = await apiClient.post(AUTH_URL_REGISTER, formData);
        const data = response.data

        if (!data?.error) {
            localStorage.setItem('token', token);
        }

        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const login = async (credentials) => {
    try {
        const response = await apiClient.post(AUTH_URL_LOGIN, credentials);
        const data = response.data

        if (!data?.error) {
            localStorage.setItem('token', token);
        }

        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

export const logout = async () => {
    try {
        const response = await apiClient.post(AUTH_URL_LOGOUT);
        const data = response.data

        if (!data?.error) {
            localStorage.removeItem('token');
        }

        return response.data;
    } catch (err) {
        console.log(err);
    }
};
