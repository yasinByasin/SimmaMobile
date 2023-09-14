import * as TYPES from '../../types';

const initialState = {
  error: null,
  loading: false,
  isSuccess: false,
  isFailure: false,
  isvalidUser: null,
  userdata: null,
  loggedInMode: false,
  isMaintenanceMode: false,
};

const authReducer = (state = initialState, action = {}) => {
  const {type, payload} = action;
  switch (type) {
    case TYPES.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isvalidUser: payload,
      };
    case TYPES.LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isvalidUser: null,
      };
    case TYPES.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userdata: payload,
      };
    case TYPES.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        userdata: null,
      };
    case TYPES.LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        userdata: null,
        isvalidUser: null,
      };
    case TYPES.LOGOUT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        userdata: null,
      };
    case TYPES.MAINTENANCE_FLAG_SUCCESS:
      return {
        ...state,
        loading: false,
        isMaintenanceMode: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
