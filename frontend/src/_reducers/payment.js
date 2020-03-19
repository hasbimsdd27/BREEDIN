import { GET_PAYMENT } from "../config/constants";

const initialState = {
  data: [],
  loading: false,
  error: false
};

const Payment = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_PAYMENT}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_PAYMENT}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_PAYMENT}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default Payment;
