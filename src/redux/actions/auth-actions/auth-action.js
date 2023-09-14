import * as TYPES from '../../types';

export const loginRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.LOGIN_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Sign up obj Action
export const signUpRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SIGNUP_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const socialLogin = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SOCIAL_LOGIN_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const logoutRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.LOGOUT_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const availabilityFlagRequest = (isMaintenanceMode, cbSuccess) => {
  return {
    type: TYPES.MAINTENANCE_FLAG_REQUEST,
    isMaintenanceMode,
    cbSuccess,
  };
};

export const updateUserBiometricsKey = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.UPDATE_USER_BIOMETRICS_KEY_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};


