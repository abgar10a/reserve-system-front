export const API_URL = "http://localhost:8000/api";

// auth
export const AUTH_URL_LOGIN = `/auth/login`;
export const AUTH_URL_REGISTER = `/auth/register`;
export const AUTH_URL_LOGOUT = `/auth/logout`;
export const AUTH_URL_PROVIDER = (provider) => `/auth/${provider}/callback`;

// user
export const USER_URL_GET_USER = `/user`;