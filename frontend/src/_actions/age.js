import { GET_ALL_AGES } from "../config/constants";
import { API } from "../config/api";

export const getAllAges = () => {
  return {
    type: GET_ALL_AGES,
    payload: async () => {
      const res = await API.get("ages");
      return res.data.data;
    }
  };
};
