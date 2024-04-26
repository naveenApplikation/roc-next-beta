import axios from "axios";

const Instance = axios.create({
  baseURL: "https://roc-web-app.uc.r.appspot.com",
});

Instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("Token");
    // const user = getData ? JSON.parse(getData) : null;
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Instance.interceptors.response.use(
  (config) => {
    config.headers["x-auth-token"] = "";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Instance;
