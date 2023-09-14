import * as TYPES from '../../types';

export const getFaqsRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_FAQS_REQUEST_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

export const getCitiesRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CITIES_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

export const getAdsRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ADS_REQUEST_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

export const getProfileData = (params,cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_PROFILE_INFO_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const sendInquirieRequest = (params,cbSuccess, cbFailure) => {
  return {
    type: TYPES.SEND_INQUIRIE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const updateProfileRequest = (params,cbSuccess, cbFailure) => {
  return {
    type: TYPES.SAVE_PROFILE_INFO_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//charge Balanc obj Action
export const chargeBalanceRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CHARGE_BALANCE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//get user wallet
export const getUserWalletRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_USER_WALLET_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const getConfigRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CONFIG_REQUEST,
    cbSuccess,
    cbFailure,
  };
};