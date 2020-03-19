import { POST_LOGIN, LOGOUT, POST_REGISTER } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const postLogin = data => {
  return {
    type: POST_LOGIN,
    payload: async () => {
      const res = await API.post("login", data);
      if (res) {
        localStorage.setItem("token", res.data.data.token);
      }
      return res.data.data;
    }
  };
};

export const postRegister = data => {
  return {
    type: POST_REGISTER,
    payload: async () => {
      const res = await API.post("register", data);
      if (res) {
        localStorage.setItem("token", res.data.data.token);
      }
      return res.data.data;
    }
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
