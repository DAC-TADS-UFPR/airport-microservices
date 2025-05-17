import axios from "axios";
import qs from "qs";
import getCookieToken from "@/utils/getCookieToken";
import deleteCookieToken from "@/utils/deleteCookieToken";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const prepareParams = (options: any) => {
  const params = {
    params: options,
    paramsSerializer: (params: any) => {
      return qs.stringify(params);
    },
  };

  return params;
};

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});

api.interceptors.request.use(
  async (config) => {
    const auth = await getCookieToken();
    if (auth?.accessToken) {
      config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
      config.headers["Accept"] = "*/*";
      // config.headers["Accept-Encoding"] = "gzip, deflate, br";
      // config.headers["Connection"] = "keep-alive";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      deleteCookieToken();
    }
    if (error.response && error.response.status === 403) {
      deleteCookieToken();
    }
    return Promise.reject(error);
  }
);

export default api;
