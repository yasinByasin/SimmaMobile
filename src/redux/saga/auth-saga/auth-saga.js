import { put, takeLatest } from 'redux-saga/effects';
import * as types from '../../types';
import { axios, get, post } from '../../../services';
import { AUTH_CONST, NEW_AUTH_CONST, UPDATE_BIO_KEY } from '../../../utilities/routes';
import { responseValidator, encryptData } from '../../../utilities';

export function* loginRequest() {
  yield takeLatest(types.LOGIN_REQUEST_REQUEST, login);
}
function* login(params) {
  try {

    let response = yield get(
      `${AUTH_CONST}exists?phoneNumber=${params?.params?.phone}`,
    );
    const phoneprefix = params?.params?.phone?.replace('%2B', '+');

    const responseData = {
      phone: phoneprefix,
      firebaseRes: params?.params?.firebaseRes,
      is_valid_user: response?.data,
    };
    yield put({
      type: types.LOGIN_REQUEST_SUCCESS,
      payload: responseData,
    });
    params.cbSuccess(response);
  } catch (error) {
    yield put({
      type: types.LOGIN_REQUEST_FAILURE,
      payload: null,
    });
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    params.cbFailure(error);
  }
}

//Sign Up Api Handler

export function* signupRequest() {
  yield takeLatest(types.SIGNUP_REQUEST, signup);
}

function* signup(params) {
  const reqParams = params.params;
  try {
    const authParams = encryptData(JSON.stringify(reqParams || '{}'))
    let response = yield post(`${NEW_AUTH_CONST}authenticate/`, { encryptedData: authParams });

    yield put({
      type: types.SIGNUP_SUCCESS,
      payload: response?.data,
    });
    params.cbSuccess(response?.data);
  } catch (error) {
    yield put({
      type: types.SIGNUP_FAILURE,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    params.cbFailure(error);
  }
}

export function* logoutRequest() {
  yield takeLatest(types.LOGOUT_REQUEST_REQUEST, logout);
}

function* logout(params) {
  try {
    yield put({
      type: types.LOGOUT_REQUEST_SUCCESS,
    });
    yield put({
      type: types.SAVE_PROFILE_INFO_SUCCESS,
      payload: null,
    });
    params.cbSuccess();
  } catch (error) {
    yield put({
      type: types.LOGOUT_REQUEST_FAILURE,
    });
    params.cbFailure();
  }
}

export function* availabilityFlagRequest() {
  yield takeLatest(types.MAINTENANCE_FLAG_REQUEST, checkAvailabilityFlag);
}

function* checkAvailabilityFlag(params) {
  try {

    const responseData = params?.isMaintenanceMode;
    yield put({
      type: types.MAINTENANCE_FLAG_SUCCESS,
      payload: responseData,
    });
    params.cbSuccess(responseData);
  } catch (error) {
    yield put({
      type: types.MAINTENANCE_FLAG_SUCCESS,
      payload: true,
    });
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    params.cbFailure(error);
  }
}

export function* updateUserBiometricsKey() {
  yield takeLatest(types.UPDATE_USER_BIOMETRICS_KEY_REQUEST, updateBiometricsKey);
}

function* updateBiometricsKey({ params, cbSuccess, cbFailure }) {
  try {
    let response = yield post(UPDATE_BIO_KEY, params, {}, true);
    cbSuccess(response.data);
  } catch (error) {
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    const { logout } = responseValidator(status, msg);
    cbFailure(error, logout);
  }
}