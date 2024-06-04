import axios from "axios";

const Instance = axios.create({
  // baseURL: "https://roc-web-app.uc.r.appspot.com",
  baseURL: "https://beta-dot-roc-app-425011.nw.r.appspot.com",
  // baseURL: "http://localhost:8080",
});

Instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("Token");
    const loginToken = window.localStorage.getItem("loginToken");
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

// You can remove the response interceptor if it's not needed
// Or ensure it does not modify headers unnecessarily
Instance.interceptors.response.use(
  (response) => {
    // You can still check for something in response or perform actions
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Instance;
