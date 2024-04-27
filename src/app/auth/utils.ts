import Cookies from "js-cookie";
import wretch from "wretch";
import { API_URL } from "../config";

// Setup for http request
const api = wretch(API_URL).accept("application/json");

/**
 * Store a token in cookies
 * @param {string} token - Stored token
 * @param {"access" | "refresh"} type - The type of the token (access or refresh). 
 */

const storeToken = (token: string, type: "access" | "refresh") => {
  Cookies.set(type + "Token", token);
}

/**
 * Retrieve token
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 * @returns {string | undefined} state of the token 
 */

const getToken = (type: string) => {
  return Cookies.get(type + "Token");
}

/**
 * Remove access and refresh token
 */

const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}

/**
 * Function for user authentication
 */

const register = (email: string, username: string, password: string) => api.post({
  username, email, password
}, "/auth/users/");

const login = (username: string, password: string) => {
  return api.post({ username, password }, "/auth/jwt/create");
};

const logout = () => {
  const refreshToken = getToken("refresh");
  return api.post({
    refresh: refreshToken
  }, "/auth/logout/");
}

const handleJWTRefresh = () => {
  const refreshToken = getToken("refresh");
  return api.post({
    refresh: refreshToken
  }, "/auth/jwt/refresh");
}

const resetPassword = (email:string) => api.post({
  email
}, "/auth/users/reset_password");

const resetPasswordConfirm = (
  new_password: string,
  re_new_password: string,
  token:string,
  uid: string,
) => api.post({
  uid, token, new_password, re_new_password
}, "auth/users/reset_password/confirm");

export const AuthActions = () => {
  return {
    register,
    login,
    logout,
    handleJWTRefresh,
    resetPassword,
    resetPasswordConfirm,
    getToken,
    storeToken,
    removeTokens,
  }
}