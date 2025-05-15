import apiClient from "./apiClient.js";
import {USER_URL_GET_USER} from "../constants/api.js";

export const getProfile = async () => {
    try {
        const response = await apiClient.get(USER_URL_GET_USER);
        const data = response?.data;

        if (data?.error)
            return null;

        return data.data;
    } catch (err) {
        console.log(err)
    }
}