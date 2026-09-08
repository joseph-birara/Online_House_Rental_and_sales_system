export function getApiErrorMessage(error) {
  if (error?.response?.status === 429) {
    return "Too many attempts. Please wait a few minutes and try again.";
  }
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) {
    return data;
  }
  if (data?.error) {
    return data.error;
  }
  if (data?.message) {
    return data.message;
  }
  return error?.message || "Something went wrong. Please try again.";
}
