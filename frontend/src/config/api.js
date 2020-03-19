import axios from "axios";
import { baseUrl } from "./constants";
export const API = axios.create({
  baseURL: baseUrl
});

export const setAuthToken = token => {
  API.defaults.headers.common["Authorization"] = token;
};
