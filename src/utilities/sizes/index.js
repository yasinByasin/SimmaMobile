import {I18nManager, Platform} from 'react-native';

export const size = {
  xhuge: 55,
  huge: 50,
  shuge: 45,
  xxxtitle: 38,
  xxtitle: 36,
  xtitle: 34,
  title: 32,
  h1: 30,
  h2: 28,
  h3: 26,
  h4: 25,
  h5: 24,
  h6: 22,
  xxlarge: 20,
  xlarge: 19,
  large: 18,
  medium: 17,
  normal: 16,
  small: 15,
  xsmall: 14,
  xxsmall: 13,
  tiny: 12,
  xtiny: 11,
  xxtiny: 10,
  xxxtiny: 9,
};

export const family = {
  // English Fonts
  Poppins_SemiBold: I18nManager.isRTL ? 'Almarai-Light' : Platform.select({ android: 'SF-Pro-Text-Regular', ios: 'SF Pro Text Regular' }),
  Poppins_Regular: I18nManager.isRTL ? 'Almarai-Regular' : Platform.select({ android: 'SF-Pro-Text-Medium', ios: 'SF Pro Text Medium' }),
  Poppins_Medium: I18nManager.isRTL ? 'Almarai-Bold' : Platform.select({ android: 'SF-Pro-Text-Bold', ios: 'SF Pro Text Bold' }),
  Poppins_Bold: I18nManager.isRTL ? 'Almarai-ExtraBold' : Platform.select({ android: 'SF-Pro-Text-Heavy', ios: 'SF Pro Text Heavy' }),

  // Arabic Fonts
  // Cairo_Black: 'Cairo-Black',
  // Cairo_Bold: 'Cairo-Bold',
  // Cairo_ExtraLight: 'Cairo-ExtraLight',
  // Cairo_Light: 'Cairo-Light',
  // Cairo_Regular: 'Cairo-Regular',
  // Cairo_SemiBold: 'Cairo-SemiBold',
};
