import { GET_ALL_AGES } from "../config/constants";

const initialState = {
  data: [],
  loading: false,
  error: false
};

const Age = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_AGES}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_ALL_AGES}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_ALL_AGES}_REJECTED`:
      return {
        ...state,
        data: false,
        error: true
      };
    default:
      return state;
  }
};

export default Age;
