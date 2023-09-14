import { put, takeLatest } from 'redux-saga/effects';
import * as types from '../../types';
import { axios, get, post } from '../../../services';
import {
  baseURL,
  FAQ_CONST,
  CONFIG_CONST,
  NEW_AUTH_CONST,
  ADS_CONST,
  CHARGE_VOUCHER,
  GET_WALLET,
  SEND_INQUIRIE,
  CITIES_CONST,
} from '../../../utilities/routes';
import { responseValidator, encryptData } from '../../../utilities';
import { authHeader, header } from '../../../utilities/constants';
import { TIMEOUT } from '../../../services/apiServices';
//Get Faq request
export function* getFaqsRequest() {
  yield takeLatest(types.GET_FAQS_REQUEST_REQUEST, getFaqs);
}
//get faq action
function* getFaqs(params) {
  yield put({
    type: types.SET_PROFILE_LOADER,
  });
  try {
    let response = yield get(`${FAQ_CONST}`);
    yield put({
      type: types.GET_FAQS_REQUEST_SUCCESS,
      payload: response?.data,
    });
    params.cbSuccess(response?.data);
  } catch (error) {
    let status = JSON.stringify(error.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    yield put({
      type: types.GET_FAQS_REQUEST_FAILURE,
      payload: [],
    });
    params.cbFailure(error);
  }
}

export function* getCitiesRequest() {
  yield takeLatest(types.GET_CITIES_REQUEST, getCities);
}
//get faq action
function* getCities({cbSuccess, cbFailure}) {
  try {
    let response = yield get(`${CITIES_CONST}`);
    yield put({
      type: types.GET_CITIES_REQUEST_SUCCESS,
      payload: response?.data,
    });
    cbSuccess(response?.data);
  } catch (error) {
    let status = JSON.stringify(error.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    yield put({
      type: types.GET_CITIES_REQUEST_FAILURE,
      payload: [],
    });
    cbFailure(error);
  }
}

export function* getAdsRequest() {
  yield takeLatest(types.GET_ADS_REQUEST_REQUEST, getAds);
}

function* getAds(params) {
  yield put({
    type: types.SET_PROFILE_LOADER,
  });
  try {
    let response = yield get(`${ADS_CONST}`);
    yield put({
      type: types.GET_ADS_REQUEST_SUCCESS,
      payload: response?.data,
    });
    params.cbSuccess(response?.data);
  } catch (error) {
    let status = JSON.stringify(error.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    yield put({
      type: types.GET_ADS_REQUEST_FAILURE,
      payload: [],
    });
    params.cbFailure(error);
  }
}

export function* getConfigRequest() {
  yield takeLatest(types.GET_CONFIG_REQUEST, getConfig);
}
//get Config action
function* getConfig({ cbSuccess, cbFailure }) {
  try {
    let response = yield get(`${CONFIG_CONST}`);
    cbSuccess(response?.data);
  } catch (error) {
    cbFailure(error);
  }
}
//Get My Profile Data
export function* getProfileDataRequest() {
  yield takeLatest(types.GET_PROFILE_INFO_REQUEST_REQUEST, getProfileData);
}
//get profile data action
function* getProfileData(params) {
  yield put({
    type: types.SET_PROFILE_LOADER,
  });
  try {
    let myInfo = yield axios.get(`${baseURL + NEW_AUTH_CONST}me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params?.params?.token}`,
      },
      timeout: TIMEOUT,
    });
    yield put({
      type: types.GET_PROFILE_INFO_SUCCESS,
      payload: myInfo?.data,
    });
    params.cbSuccess(myInfo?.data);
  } catch (error) {
    let status = JSON.stringify(error.message);
    let msg = error?.response?.data?.message;
    const { logout } = responseValidator(status, msg);
    yield put({
      type: types.GET_PROFILE_INFO_FAILURE,
      payload: null,
    });

    if (logout) {
      yield put({
        type: types.LOGOUT_REQUEST_SUCCESS,
      });
    }
    params.cbFailure(logout);
  }
}

//Send Inquirie
export function* sendInquirieRequest() {
  yield takeLatest(types.SEND_INQUIRIE_REQUEST, send);
}

//Send Inquirie action
function* send({ params, cbSuccess, cbFailure }) {
  try {
    const response = yield post(`${SEND_INQUIRIE}`, params, {}, true);
    cbSuccess(response);
  } catch (error) {
    let status = JSON.stringify(error.message);
    let msg = error?.response?.data?.message;
    const { logout } = responseValidator(status, msg);
    if (logout) {
      yield put({
        type: types.LOGOUT_REQUEST_SUCCESS,
      });
    }
    cbFailure(error, logout);
  }
}

//save profile info  request
export function* saveProfileRequest() {
  yield takeLatest(types.SAVE_PROFILE_INFO_REQUEST_REQUEST, save_profile_info);
}
//save profile info  action
function* save_profile_info(params) {
  yield put({
    type: types.SET_PROFILE_LOADER,
  });
  const requestBody = {
    firstName: params?.params?.firstName,
    lastName: params?.params?.lastName,
    email: params?.params?.email?.trim(),
    language: params?.params?.language,
    address: params?.params?.address,
  };
  try {
    let response = yield axios.patch(
      `${baseURL + NEW_AUTH_CONST}me`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params?.params?.token}`,
        },
        timeout: TIMEOUT,
      },
    );
    yield put({
      type: types.SAVE_PROFILE_INFO_SUCCESS,
      payload: response?.data,
    });
    params.cbSuccess(response?.data);
  } catch (error) {
    yield put({
      type: types.SAVE_PROFILE_INFO_FAILURE,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    params.cbFailure(error);
  }
}

//Charge Balance Api Handler

export function* chargeBalanceRequest() {
  yield takeLatest(types.CHARGE_BALANCE_REQUEST, charge);
}

function* charge(params) {
  try {
    const encryptOrderParams = encryptData(JSON.stringify(params.params.chargeParams), params.params.userId)
    let response = yield post(`${CHARGE_VOUCHER}`, { encryptedData: encryptOrderParams }, {}, true);
    yield put({
      type: types.CHARGE_BALANCE_SUCCESS,
      payload: response?.data.wallet,
    });
    params.cbSuccess(response?.data);
  } catch (error) {
    const errorStatus = error?.response?.data?.status
    let status = JSON.stringify(error.message);
    let msg = error?.response?.data?.message;
    const { logout } = responseValidator(status, msg);
    if (logout) {
      yield put({
        type: types.LOGOUT_REQUEST_SUCCESS,
      });
    }
    if (errorStatus) {
      params.cbFailure(errorStatus, logout);
    } else {
      params.cbFailure('backendError', logout);
    }
  }
}
// Get user wallet Api Handler

export function* getUserWallet() {
  yield takeLatest(types.GET_USER_WALLET_REQUEST, getWallet);
}

function* getWallet(params) {
  try {
    const isSummary = params.params.summary
    let response = yield get(`${GET_WALLET}`, null, JSON.stringify({ summary: isSummary }), true);
    // let response1 = yield axios.get(
    //   `${baseURL + GET_WALLET}`,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${params?.params?.token}`,
    //     },
    //     params: JSON.stringify({ summary: isSummary }),
    //     timeout: TIMEOUT,
    //     paramsSerializer: {
    //       indexes: false, // empty brackets like `arrayOfUserIds[]`
    //     },
    //     target: {},
    //   },
    // );
    if (isSummary) {
      yield put({
        type: types.GET_USER_SUMMARY_WALLET_SUCCESS,
        payload: response?.data,
      });
    } else {
      yield put({
        type: types.GET_USER_WALLET_SUCCESS,
        payload: response?.data,
      });
    }
    params.cbSuccess(response?.data);
  } catch (error) {
    let status = JSON.stringify(error.message);
    let msg = error?.response?.data?.message;
    const logout = params?.params?.checkLogOut ? (msg === 'jwt expired') : (responseValidator(status, msg)?.logout || false);
    yield put({
      type: types.GET_USER_WALLET_FAILURE,
      payload: 'response?.data',
    });
    params.cbFailure(error, logout);
    if (logout) {
      yield put({
        type: types.LOGOUT_REQUEST_SUCCESS,
      });
    }
  }
}
