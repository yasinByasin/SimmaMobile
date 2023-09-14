export {WP, HP} from './styling/responsive';
export {appImages, appIcons, appLogos, appSvgs, appLottie} from '../assets';
export {colors} from './colors';
export {size, family} from './sizes';
export * from './string/strings';
export {encryptData} from './network/encryption'
export {
  userNameRegEx,
  image_options,
  phonePrefix,
  pkphonePrefix,
  translateElement,
  extractText,
  sendPageRoute,
  trackPageRoute
} from './constants';
export {baseURL, AUTH_CONST, NEW_AUTH_CONST} from './routes';
export {
  loginFormFields,
  loginSchema,
  verifyCodeSchema,
  contactUsFields,
  contactusSchema,
  signupFormFields,
  signupSchema,
  editFormFields,
  profileSchema,
  responseValidator,
  editOrderFormFields,
  orderSchema
} from './validations';

export {
  StatusBarHeight,
  DimensionsWindowHeight,
  DimensionsWindowWidth,
} from './statusBarHeight';
export {languageSelector, checkConnected} from './helper';
export const paginationLimit = 10;
