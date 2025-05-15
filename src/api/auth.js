import {
    AUTH_URL_LOGIN,
    AUTH_URL_LOGOUT,
    AUTH_URL_PROVIDER,
    AUTH_URL_REGISTER,
} from "../constants/api";
import apiClient from "./apiClient";
import {setUser} from "../redux/reducers/userSlice.js";

export const register = async (formData) => {
    try {
        const response = await apiClient.post(AUTH_URL_REGISTER, formData);
        const responseData = response.data.data;

        if (!responseData?.error) {
            handleLoginResponse(responseData.token?.access_token, responseData.token?.refresh_token);
        }

        return responseData;
    } catch (err) {
        console.log(err);
    }
};

export const login = async (credentials) => {
    try {
        const response = await apiClient.post(AUTH_URL_LOGIN, credentials);
        const responseData = response.data.data;

        if (!responseData?.error) {
            handleLoginResponse(responseData.token?.access_token, responseData.token?.refresh_token);
        }

        return responseData;
    } catch (err) {
        return err.response.data;
    }
};

export const loginWithProvider = async (provider, token) => {
    try {
        const response = await apiClient.post(AUTH_URL_PROVIDER(provider), {
            token: token.access_token,
        });
        const responseData = response.data.data;

        console.log(responseData.token);

        if (!responseData?.error) {
            handleLoginResponse(responseData.token?.access_token, responseData.token?.refresh_token);
        }

        return responseData;
    } catch (err) {
        return err.response.data;
    }
};

export const logout = async () => {
    try {
        const response = await apiClient.post(AUTH_URL_LOGOUT);
        const data = response.data

        if (!data?.error) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }

        return data;
    } catch (err) {
        console.log(err);
    }
};

export const handleLoginResponse = (access_token, refresh_token) => {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
}
