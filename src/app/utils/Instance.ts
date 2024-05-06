import axios from "axios";

const Instance = axios.create({
  baseURL: "https://roc-web-app.uc.r.appspot.com",
  // baseURL: "http://localhost:8080",
});

Instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("Token");
    const loginToken = window.localStorage.getItem("loginToken");
    // const user = getData ? JSON.parse(getData) : null;
    if (token) {
      config.headers["x-auth-token"] = token;
      if (loginToken) {
        // If loginToken exists, add it to headers
        config.headers["x-login-token"] = loginToken;
      }
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
    config.headers["x-login-token"] = "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Instance;
