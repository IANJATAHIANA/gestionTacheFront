import axios from "axios";

export const CosmoWEB = axios.create({
  baseURL: `${import.meta.env.VITE_ENV_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
