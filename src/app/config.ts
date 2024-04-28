import wretch from "wretch";

export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const AVATAR_URL = process.env.NEXT_PUBLIC_AVATAR_URL

// Setup for http request
export const api = wretch(API_URL).accept("application/json");