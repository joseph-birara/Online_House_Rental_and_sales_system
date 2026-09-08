const TOKEN_KEY = "user-token";
const USER_KEY = "user-data";
const EMAIL_VERIFY_PATH_KEY = "email-verify-path";

function safeParse(value) {
  if (value == null || value === "") {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  if (!token || typeof token !== "string") {
    return true;
  }
  const parts = token.split(".");
  if (parts.length < 2) {
    return true;
  }
  try {
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) {
      return false;
    }
    return payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export function getStoredToken() {
  if (typeof window === "undefined") {
    return "";
  }
  const parsed = safeParse(window.localStorage.getItem(TOKEN_KEY));
  const token = typeof parsed === "string" ? parsed : "";
  if (!token || isTokenExpired(token)) {
    if (token) {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(USER_KEY);
    }
    return "";
  }
  return token;
}

export function getStoredUser() {
  if (typeof window === "undefined") {
    return "";
  }
  const user = safeParse(window.localStorage.getItem(USER_KEY));
  return user && typeof user === "object" ? user : "";
}

export function getStoredSession() {
  const token = getStoredToken();
  if (!token) {
    return { token: "", user: "" };
  }
  return { token, user: getStoredUser() };
}

export function persistSession(token, user) {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function setEmailVerifyPath(path) {
  window.localStorage.setItem(EMAIL_VERIFY_PATH_KEY, path);
}

export function getEmailVerifyPath() {
  const raw = window.localStorage.getItem(EMAIL_VERIFY_PATH_KEY);
  if (!raw) {
    return "";
  }
  return raw.replace(/"/g, "");
}

export function clearEmailVerifyPath() {
  window.localStorage.removeItem(EMAIL_VERIFY_PATH_KEY);
}

export function clearAuth() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(EMAIL_VERIFY_PATH_KEY);
}
