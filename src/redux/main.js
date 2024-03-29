import axios from "axios";
function getLocalAccessToken() {
    const accessToken = window.localStorage.getItem("tokens");
    return accessToken;
  }
  
  
  export const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  instance.interceptors.request.use(
    (config) => {
      const token = getLocalAccessToken();
      if (token) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
  
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
  
          try {

            const { accessToken } = window.localStorage.getItem("tokens");
            window.localStorage.setItem("tokens", accessToken);
            instance.defaults.headers.common["x-access-token"] = accessToken;
  
            return instance(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
  
            return Promise.reject(_error);
          }
        }
  
        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
  
      return Promise.reject(err);
    }
  );
