import * as TYPES from '../../types';

export const getStoresRequest = (isDemoMode = false ,cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_STORES_REQUEST,
    isDemoMode,
    cbSuccess,
    cbFailure,
  };
};

export const getActiveStoreRequest = (store) => {
  return {
    type: TYPES.GET_STORE_REQUEST,
    store,
  };
};

export const getOrderRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ORDERS_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const getWalletEligibleRequest = (params) => {
  return {
    type: TYPES.GET_WALLET_ELIGIBLE_REQUEST,
    params,
  };
};

export const getCartRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CART_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const applyCouponCodeRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_COUPON_CODE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const getZainRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ZAIN_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const updateZainTransactionRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.UPDATE_ZAIN_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};


export const initializeZainTransactionRequest = (data, cbSuccess, cbFailure) => {
  return {
    type: TYPES.INITIALIZE_ZAIN_REQUEST,
    data,
    cbSuccess,
    cbFailure,
  };
};

export const generateZainTokenRequest = (data, cbSuccess) => {
  return {
    type: TYPES.GENERATE_ZAIN_REQUEST,
    data,
    cbSuccess,
  };
};

export const cancelOrderRequest = (params, cbSuccess) => {
  return {
    type: TYPES.CANCEL_ORDER_REQUEST,
    params,
    cbSuccess,
  };
};

export const updateOrder = ( params ) => {
  return {
    type: TYPES.UPDATE_ORDER,
    params,
  };
};

export const getTransactionStatusRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.PAID_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const converOrderRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CONVERT_ORDER_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
