export const REQUEST_TIMEOUT_MILLISECONDS = 10000;
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/v1/"
    : "https://task-manager-api-s94k.onrender.com/api/v1/";
