import { put, takeLatest } from 'redux-saga/effects';
import * as types from '../../types';
import { get, axios } from '../../../services';
import { ORDER_CONST, STORE_CONST, baseURL, ZAIN_CASH, STORE_DEMO, WALLET_ELIGIBLE } from '../../../utilities/routes';
import { responseValidator } from '../../../utilities';
import { TIMEOUT } from '../../../services/apiServices';

// get stores request
export function* getStoresRequest() {
  yield takeLatest(types.GET_STORES_REQUEST, getStores);
}

// get stores action
function* getStores(params) {
  yield put({
    type: types.SET_ORDER_LOADER,
  });
  try {
    const URL = params.isDemoMode ? `${STORE_DEMO}` : `${STORE_CONST}`;
    let response = yield get(URL);
    yield put({
      type: types.GET_STORES_SUCCESS,
      payload: response.data,
    });
    params.cbSuccess(response.data);
  } catch (error) {
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    const { maintenanceMode, code } = responseValidator(status, msg);
    yield put({
      type: types.GET_STORES_FAILURE,
      payload: [],
    });
    if (maintenanceMode) {
      yield put({
        type: types.MAINTENANCE_FLAG_SUCCESS,
        payload: true,
      });
    }
    params.cbFailure({ error, code });
  }
}

// get stores request
export function* getActiveStoreRequest() {
  yield takeLatest(types.GET_STORE_REQUEST, getActiveStore);
}

// get stores action
function* getActiveStore(params) {

  yield put({
    type: types.GET_STORE_SUCCESS,
    payload: params?.store,
  });
}

// get stores request
export function* getAllOrder() {
  yield takeLatest(types.GET_ORDERS_REQUEST, getOrders);
}

// get stores action
function* getOrders(params) {
  yield put({
    type: types.SET_ORDER_LOADER,
  });
  try {
    let response = yield axios.get(
      `${baseURL + ORDER_CONST}?page=${params?.params?.page}&limit=10`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params?.params?.token}`,
        },
        timeout: TIMEOUT,
      },
    );

    if (response?.data) {
      const allOrders = {
        all_orders: response?.data?.results,
        type: params?.params?.reload,
      };
      yield put({
        type: types.GET_ORDERS_SUCCESS,
        payload: allOrders,
      });
      params.cbSuccess(response?.data?.results);
    }
  } catch (error) {
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    const { logout } = responseValidator(status, msg);
    if (logout) {
      yield put({
        type: types.LOGOUT_REQUEST_SUCCESS,
      });
      yield put({
        type: types.GET_ORDERS_FAILURE,
        payload: '',
      });
    } else {
      yield put({
        type: types.GET_ORDERS_FAILURE,
        payload: [],
      });
    }

    params.cbFailure(error);
  }
}

// get Wallet Eligible request
export function* getWalletEligibleRequest() {
  yield takeLatest(types.GET_WALLET_ELIGIBLE_REQUEST, getWalletEligible);
}

// get Wallet Eligible action
function* getWalletEligible({ params }) {
  try {
    let response = yield axios.get(
      `${baseURL + WALLET_ELIGIBLE}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params}`,
        },
        timeout: TIMEOUT,
      },
    );

    if (response?.data) {
      yield put({
        type: types.GET_WALLET_ELIGIBLE_SUCCESS,
        payload: response?.data || [],
      });
    }
  } catch (error) {
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    const { logout } = responseValidator(status, msg);
    if (logout) {
      yield put({
        type: types.LOGOUT_REQUEST_SUCCESS,
      });
    }

    yield put({
      type: types.GET_WALLET_ELIGIBLE_FAILURE,
      payload: null,
    });
  }
}

// get cart request
export function* getCartRequest() {
  yield takeLatest(types.GET_CART_REQUEST, getCart);
}

export function* applyCouponCodeRequest() {
  yield takeLatest(types.GET_COUPON_CODE_REQUEST, getCouponCode);
}

export function* getZainRequest() {
  yield takeLatest(types.GET_ZAIN_REQUEST, getZain);
}

export function* updateZainTransactionRequest() {
  yield takeLatest(types.UPDATE_ZAIN_REQUEST, updateZainTransaction);
}

export function* initializeZainTransactionRequest() {
  yield takeLatest(types.INITIALIZE_ZAIN_REQUEST, initializeZainTransaction);
}

export function* generateZainTokenRequest() {
  yield takeLatest(types.GENERATE_ZAIN_REQUEST, generateZainTransaction);
}

export function* cancelOrderRequest() {
  yield takeLatest(types.CANCEL_ORDER_REQUEST, cancelOrder);
}
// get cart request
export function* updateOrder() {
  yield takeLatest(types.UPDATE_ORDER, updateDetails);
}
// get stores action
function* getCart(params) {
  yield put({
    type: types.SET_ORDER_LOADER,
  });
  try {
    let appliedCode = '';
    const requestBody = {
      cart: params?.params?.cart,
    };
    let response = yield axios.post(
      `${baseURL}/merchants/${params?.params?.merchantId}/cart`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params?.params?.token}`,
        },
        timeout: TIMEOUT,
      },
    );
    if (response?.data) {
      if (params?.params?.appliedDiscount) {
        appliedCode = params.params.appliedDiscount.code;
      }
      const data = {
        ...response.data,
        ...{ merchantId: params.params.merchantId }
      }
      yield put({
        type: types.GET_CART_SUCCESS,
        payload: data,
      });
      params.cbSuccess({ ...response?.data, ...{ couponCode: appliedCode } });
    }
  } catch (error) {
    console.error("> > > > > >  > > > > ", {error})
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    const { maintenanceMode, code } = responseValidator(status, msg);
    yield put({
      type: types.GET_CART_FAILURE,
      payload: [],
    });

    if (maintenanceMode) {
      yield put({
        type: types.MAINTENANCE_FLAG_SUCCESS,
        payload: true,
      });
    }
    params.cbFailure({ error, code });
  }
}

function* getCouponCode(params) {
  yield put({
    type: types.SET_ORDER_LOADER,
  });
  try {
    const requestBody = {
      includeCouponCodeTypes: true,
      order: params?.params?.order,
      couponCode: params?.params?.code
    };
    let response = yield axios.post(
      `${baseURL}/orders/applyDiscountCode`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params?.params?.token}`,
        },
        timeout: TIMEOUT,
      },
    );
    if (response?.data && response?.data.isValid) {

      const order = params?.params?.order;
      const discountCodesList = ['discountCode', 'firstTimeDiscountCode', 'oneTimeDiscountCode'];
      order.discountOptions.push(response?.data.appliedDiscount);
      order.couponCode = params.params?.code;
      yield put({
        type: types.UPDATE_ORDER_SUCCESS,
        payload: order,
      });
      params.cbSuccess(response?.data, order);
    } else {
      params.cbFailure(response?.data);
    }
  } catch (error) {
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    const { code } = responseValidator(status, msg);
    params.cbFailure({ error, code });
  }
}

// get stores action
function* cancelOrder(params) {
  yield put({
    type: types.SET_ORDER_LOADER,
  });
  try {
    let response = yield axios.post(
      `${baseURL}/orders/payment/status/cancel`,
      { orderId: params?.params?.orderId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params?.params?.token}`,
        },
        timeout: TIMEOUT,
      },
    );
    if (response?.data) {
      params.cbSuccess(response?.data);
    }
  } catch (error) {
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    yield put({
      type: types.UPDATE_ORDER_SUCCESS,
      payload: [],
    });
    params.cbSuccess(error);
  }
}

// get stores action
function* getZain(params) {
  yield put({
    type: types.SET_ORDER_LOADER,
  });
  try {
    let response = yield axios.get(
      `${baseURL}/orders/payment/status/zainCash?token=${params?.params?.zainToken}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params?.params?.token}`,
        },
        timeout: TIMEOUT,
      },
    );
    if (response?.data) {
      params.cbSuccess(response?.data);
    }
  } catch (error) {
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    yield put({
      type: types.GET_ZAIN_FAILURE,
      payload: [],
    });
    params.cbFailure(error);
  }
}

function* updateZainTransaction(params) {
  try {
    let response = yield axios.patch(
      `${baseURL}/orders/payment/${params.params?.simmaId}`,
      {
        id: params.params.id,
        message: params.params.message,
        status: params.params.status,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params?.params?.token}`,
        },
        timeout: TIMEOUT,
      },
    );
    if (response?.data) {
      params.cbSuccess(response?.data);
    }
  } catch (error) {
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    params.cbFailure(error);
  }
}

function* initializeZainTransaction(params) {

  try {
    let response = yield axios.post(
      `${ZAIN_CASH}/init`,
      {
        lang: 'en',
        'merchantId': params.data.merchantId,
        token: params.data.token
      },
    );
    if (response?.data) {
      params.cbSuccess(response?.data);
    }
  } catch (error) {
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    params.cbFailure(error);
  }
}

function* generateZainTransaction(params) {

  try {
    let response = yield axios.get(
      `${baseURL}/orders/payment/zainCashToken/${params.data?.id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params.data?.token}`,
        },
        timeout: TIMEOUT,
      },
    );

    if (response.data) {
      params.cbSuccess(response?.data);
    }
  } catch (error) {
    let status = JSON.stringify(error?.message);
    let msg = error?.response?.data?.message;
    responseValidator(status, msg);
    params.cbSuccess(error);
  }
}


// get stores action
function* updateDetails(params) {
  yield put({
    type: types.UPDATE_ORDER_SUCCESS,
    payload: params?.params,
  });
}

// get cart request
export function* getTransactionStatusRequest() {
  yield takeLatest(types.PAID_REQUEST, getPaymentInfo);
}

// get stores action
function* getPaymentInfo(params) {
  yield put({
    type: types.SET_ORDER_LOADER,
  });
  try {
    let response = yield axios.get(
      `${baseURL}/orders/payment/${params?.params?.txnId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params?.params?.token}`,
        },
        timeout: TIMEOUT,
      },
    );
    if (response?.data) {
      params.cbSuccess(response?.data);
    }
  } catch (error) {
    params.cbFailure(error);
  }
}

// conver order request
export function* converOrderRequest() {
  yield takeLatest(types.CONVERT_ORDER_REQUEST, converOrder);
}

// conver order action
function* converOrder({ params, cbSuccess, cbFailure }) {
  try {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params?.token}`,
      },
      timeout: TIMEOUT,
    }
    let response = yield axios.patch(`${baseURL}/orders/${params.orderId}/payment`,params.reqParams,  headers);
    if (response?.data) {
      cbSuccess(response?.data);
    }
  } catch (error) {
    cbFailure(error);
  }
}
