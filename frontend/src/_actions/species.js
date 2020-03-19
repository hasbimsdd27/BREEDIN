import { GET_ALL_SPECIES } from "../config/constants";
import { API } from "../config/api";

export const getAllSpecies = () => {
  return {
    type: GET_ALL_SPECIES,
    payload: async () => {
      const res = await API.get("species");
      return res.data.data;
    }
  };
};
