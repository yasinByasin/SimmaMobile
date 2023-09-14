import {Platform, Dimensions, StyleSheet, I18nManager} from 'react-native';
import {colors, WP, size, family, HP} from '../../../../utilities';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');
let hasNotch = DeviceInfo.hasNotch();

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerRow: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray,
    justifyContent: 'space-between',
  },
  webViewStyles: {
    opacity: 0.99,
    overflow: 'hidden',
    marginBottom: Platform.select({ android: 65, ios: hasNotch ? 90 : 70 }),
  },
  barStyle: {
    height: Platform.select({ android: 65, ios: 70 }),
    backgroundColor: colors.gray,
  },
  notchBarStyle: {
    backgroundColor: colors.gray,
    flex: Platform.select({android: 0.1, ios: 0.125}),
  },
  priceTextStyle: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
    shadowOpacity: 0.2,
    backgroundColor: colors.gray,
    width: WP('45'),
    height: 45,
    borderRadius: 5,
    marginTop: WP('2.5'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomIconContainer: {
    width: WP('45'),
    height: 45,
    marginTop: WP('2.5'),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: colors.orange,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
    shadowOpacity: 0.2,
    flexDirection: 'row',
  },
  checkoutTxtStyle: {
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Bold,
    color: colors.darkGray
  },
  checkoutImgStyle: {
    width:47,
    height: 18,
  },
  rowContainer: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    color: colors.g8,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Regular,
  },
  valueStyle: {
    color: colors.g8,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_SemiBold,
  },
  totalTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Bold,
  },
  priceTxtStyle: {
    color: colors.white,
    fontSize: size.xxlarge,
    fontFamily: family.Poppins_Bold,
  },
  buttonStyle: {
    borderRadius: 6,
    bottom: WP('4.5'),
    height: width / 8.5,
    width: width / 2.45,
    marginTop: HP('2'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  backButtonStyle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: WP('15'),
    height: 68,
  },
  backButtonTxtStyle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: size.small,
    fontFamily: family.Poppins_Bold,
  },
  errorStyle: {
    color: 'red',
    padding: 2,
    textAlign: 'left',
    fontSize: size.tiny,
    fontFamily: family.Poppins_SemiBold,
  },
  btnTxtStyle: {
    padding: 8,
    color: colors.b1,
    fontSize: size.tiny,
    textAlign: 'center',
    top: Platform.select({android: 1}),
    fontFamily: family.Poppins_SemiBold,
   // position: 'absolute',
  },
  iconText: {
    color: colors.mediumDarkGray,
    fontSize: WP(3),
    textAlign: 'center',
    fontFamily: family.Poppins_Regular,
    marginTop: 1
  },
  webBackForward: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    width: WP('60'),
    paddingHorizontal: 20,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    borderLeftWidth: 1,
    borderLeftColor: colors.lightGray2,
    borderRightWidth: 1,
    borderRightColor: colors.lightGray2,
  },
  backForwardButton: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: WP('12'),
    height: 68,
  },
});

export default styles;
