import * as TYPES from '../../types';

const initialState = {
  error: null,
  loading: false,
  isSuccess: false,
  isFailure: false,
  stores: [],
  orders: [],
  walletEligible: [],
  order: {},
  activeStore: {}
};

const orderReducers = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.GET_STORES_SUCCESS:
      return {
        ...state,
        loading: false,
        stores: payload,
      };
    case TYPES.GET_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        activeStore: payload,
      };
    case TYPES.GET_STORES_FAILURE:
      return {
        ...state,
        loading: false,
        stores: [],
      };
    case TYPES.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload?.type
          ? payload.all_orders
          : [...state.orders, ...payload.all_orders],
      };
    case TYPES.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: { ...state.order, ...payload },
      };
    case TYPES.GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        order: payload,
      };
    case TYPES.GET_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        orders: [],
      };
    case TYPES.SET_ORDER_LOADER:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_WALLET_ELIGIBLE_SUCCESS:
      return {
        ...state,
        loading: false,
        walletEligible: payload,
      };

    case TYPES.GET_WALLET_ELIGIBLE_FAILURE:
      return {
        ...state,
        loading: false,
        walletEligible: [],
      };

    default:
      return state;
  }
};

export default orderReducers;
