import { GET_PAYMENT } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getPayment = () => {
  const token = localStorage.getItem("token");
  return {
    type: GET_PAYMENT,
    payload: async () => {
      setAuthToken(token);
      const res = await API.get("payment");
      console.log(res.data.data, "ckuaks");
      return res.data.data;
    }
  };
};
