import axios from "axios";
import { clearAuth, getStoredToken, isTokenExpired } from "../utils/auth";
import { getApiErrorMessage } from "../utils/apiError";

export const API_URL =
  process.env.REACT_APP_API_URL ||
  process.env.REACT_APP_baseURL ||
  "https://house-rental.onrender.com";

const PUBLIC_AUTH_PATH =
  /\/(login|register|reset|newPassword|verify-email)(?:\/|$|\?)/i;

function isApiRequest(config = {}) {
  const url = config.url || "";
  if (/^https?:\/\//i.test(url)) {
    return url.startsWith(API_URL);
  }
  return true;
}

function attachAuthHeader(config) {
  if (!isApiRequest(config)) {
    return config;
  }
  const token = getStoredToken();
  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers) {
    delete config.headers.Authorization;
  }
  return config;
}

function handleAuthFailure(error) {
  const status = error.response?.status;
  const url = error.config?.url || "";
  if (status === 401 && isApiRequest(error.config) && !PUBLIC_AUTH_PATH.test(url)) {
    clearAuth();
    if (window.location.pathname !== "/login") {
      window.location.assign("/login");
    }
  }
  return Promise.reject(error);
}

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 20000;
axios.interceptors.request.use(attachAuthHeader);
axios.interceptors.response.use((response) => response, handleAuthFailure);

const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

api.interceptors.request.use(attachAuthHeader);
api.interceptors.response.use((response) => response, handleAuthFailure);

export { getApiErrorMessage };
export default api;
