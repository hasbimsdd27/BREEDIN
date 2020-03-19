import { POST_LOGIN, LOGOUT, POST_REGISTER } from "../config/constants";

const initialState = {
  data: [],
  loading: false,
  error: false,
  isLogin: false
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case `${POST_LOGIN}_PENDING`:
    case `${LOGOUT}_PENDING`:
    case `${POST_REGISTER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${POST_LOGIN}_FULFILLED`:
    case `${POST_REGISTER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        isLogin: true
      };
    case `${POST_LOGIN}_REJECTED`:
    case `${LOGOUT}_REJECTED`:
    case `${POST_REGISTER}_REJECTED`:
      return {
        ...state,
        data: false,
        error: true,
        isLogin: false
      };
    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        isLogin: false,
        error: false
      };
    default:
      return state;
  }
};

export default Auth;
