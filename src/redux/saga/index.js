import {fork} from 'redux-saga/effects';

import {
  loginRequest,
  logoutRequest,
  signupRequest,
  availabilityFlagRequest,
  updateUserBiometricsKey,
} from './auth-saga/auth-saga';
import {
  getFaqsRequest,
  getCitiesRequest,
  getAdsRequest,
  saveProfileRequest,
  getProfileDataRequest,
  chargeBalanceRequest,
  getUserWallet,
  getConfigRequest,
  sendInquirieRequest
} from './profile-sega/profile-sega';
import {
  getStoresRequest,
  getAllOrder,
  getCartRequest,
  updateOrder,
  getActiveStoreRequest,
  getTransactionStatusRequest,
  getZainRequest,
  cancelOrderRequest,
  applyCouponCodeRequest,
  updateZainTransactionRequest,
  initializeZainTransactionRequest,
  generateZainTokenRequest,
  getWalletEligibleRequest,
  converOrderRequest
} from './order-saga/order-saga';


export function* rootSaga() {
  yield fork(loginRequest);
  yield fork(signupRequest);
  yield fork(getFaqsRequest);
  yield fork(getCitiesRequest);
  yield fork(getStoresRequest);
  yield fork(logoutRequest);
  yield fork(availabilityFlagRequest);
  yield fork(saveProfileRequest);
  yield fork(getProfileDataRequest);
  yield fork(getAllOrder);
  yield fork(getCartRequest);
  yield fork(updateOrder);
  yield fork(getActiveStoreRequest);
  yield fork(getTransactionStatusRequest)
  yield fork(getZainRequest);
  yield fork(cancelOrderRequest);
  yield fork(applyCouponCodeRequest);
  yield fork(getAdsRequest);
  yield fork(updateZainTransactionRequest);
  yield fork(initializeZainTransactionRequest);
  yield fork(generateZainTokenRequest);
  yield fork(chargeBalanceRequest);
  yield fork(getUserWallet);
  yield fork(updateUserBiometricsKey);
  yield fork(getWalletEligibleRequest);
  yield fork(converOrderRequest);
  yield fork(getConfigRequest);
  yield fork(sendInquirieRequest);
}
