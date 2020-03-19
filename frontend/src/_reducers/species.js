import { GET_ALL_SPECIES } from "../config/constants";

const initialState = {
  data: [],
  loading: false,
  error: false
};

const Species = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_SPECIES}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_ALL_SPECIES}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_ALL_SPECIES}_REJECTED`:
      return {
        ...state,
        data: false,
        error: true
      };
    default:
      return state;
  }
};

export default Species;
