import { GET_PET, GET_DETAIL_PET, UPDATE_PET } from "../config/constants";
import { API, setAuthToken } from "../config/api";

export const getAllPet = () => {
  const Token = localStorage.getItem("token");
  return {
    type: GET_PET,
    payload: async () => {
      setAuthToken(Token);
      const res = await API.get("pets");
      if (res) {
        localStorage.setItem("onPet", res.data.data[0].id);
      }
      return res.data.data;
    }
  };
};

export const getDetailPet = id => {
  console.log(id);
  const Token = localStorage.getItem("token");
  return {
    type: GET_DETAIL_PET,
    payload: async () => {
      setAuthToken(Token);
      const res = await API.get(`pet/${id}`);
      return res.data.data;
    }
  };
};

export const updatePet = (id, data) => {
  const Token = localStorage.getItem("token");
  return {
    type: UPDATE_PET,
    payload: async () => {
      setAuthToken(Token);
      const res = await API.patch(`pet/${id}`, data);
      return res.data.data;
    }
  };
};
