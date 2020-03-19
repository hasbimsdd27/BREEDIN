import { GET_USER } from "../config/constants";
import { API } from "../config/api";

export const getAllAges = () => {
  return {
    type: GET_USER,
    payload: async () => {
      const res = await API.get("ages");
      return res.data.data;
    }
  };
};
