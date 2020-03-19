import {
  GET_PET,
  GET_DETAIL_PET,
  UPDATE_PET,
  ADD_PET
} from "../config/constants";

const initialState = {
  data: [],
  detail: [],
  loading: false,
  error: false
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_PET}_PENDING`:
    case `${GET_DETAIL_PET}_PENDING`:
    case `${UPDATE_PET}_PENDING`:
    case `${ADD_PET}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_PET}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_PET}_REJECTED`:
    case `${GET_DETAIL_PET}_REJECTED`:
    case `${UPDATE_PET}_REJECTED`:
    case `${ADD_PET}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    case `${GET_DETAIL_PET}_FULFILLED`:
    case `${UPDATE_PET}_FULFILLED`:
    case `${ADD_PET}_FULFILLED`:
      return {
        ...state,
        detail: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default Auth;
