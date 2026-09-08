import axios from "axios";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export function validateImageFile(file) {
  if (!file) {
    return null;
  }
  const typeOk = ALLOWED_TYPES.includes(file.type);
  const nameOk = /\.(jpe?g|png)$/i.test(file.name || "");
  if (!typeOk && !nameOk) {
    return "Only JPG and PNG images are allowed.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
}

export async function uploadImageToCloudinary(file) {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }
  const cloudName =
    process.env.REACT_APP_CLOUD_NAME || process.env.REACT_APP_cloud_name;
  const preset =
    process.env.REACT_APP_UPLOAD_PRESET || process.env.REACT_APP_preset_key;
  if (!cloudName || !preset) {
    throw new Error("Image upload is not configured.");
  }
  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append("upload_preset", preset);
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formdata
  );
  return response.data.secure_url;
}
