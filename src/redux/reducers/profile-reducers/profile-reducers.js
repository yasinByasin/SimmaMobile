import * as TYPES from '../../types';

const initialState = {
  error: null,
  loading: false,
  isSuccess: false,
  isFailure: false,
  getFaqs: [],
  video_url: '',
  profiledata: null,
  advertisements: [],
  userWalletError: false,
  cities: [],
};

const profileReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.GET_FAQS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        getFaqs: payload,
      };
    case TYPES.GET_FAQS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        getFaqs: [],
      };
    case TYPES.GET_VIDEO_URL_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        video_url: payload,
      };

    case TYPES.GET_CITIES_REQUEST_SUCCESS:
      return {
        ...state,
        cities: payload,
      };
    case TYPES.GET_CITIES_REQUEST_FAILURE:
      return {
        ...state,
        cities: [],
      };

    case TYPES.GET_ADS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        advertisements: payload,
      };
    case TYPES.SAVE_PROFILE_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        advertisements: [],
      };
    case TYPES.GET_VIDEO_URL_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        video_url: null,
      };
    case TYPES.SET_PROFILE_LOADER:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        profiledata: payload,
      };
    case TYPES.GET_PROFILE_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        profiledata: null,
      };
    case TYPES.SAVE_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        profiledata: payload,
      };
    case TYPES.CHARGE_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        profiledata: { ...state.profiledata, wallet: payload },
      };
    case TYPES.SAVE_PROFILE_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        profiledata: null,
      };
    case TYPES.GET_USER_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        profiledata: { ...state.profiledata, wallet: payload },
        userWalletError: false
      };
    case TYPES.GET_USER_SUMMARY_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        profiledata: {
          ...state.profiledata,
          wallet: {
            ...state.profiledata.wallet,
            ...payload,
          }
        },
        userWalletError: false
      };
    case TYPES.GET_USER_WALLET_FAILURE:
      return {
        ...state,
        loading: false,
        profiledata: { ...state.profiledata, wallet: {} },
        userWalletError: true
      };

    default:
      return state;
  }
};

export default profileReducer;
