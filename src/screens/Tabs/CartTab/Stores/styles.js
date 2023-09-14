import { Platform, Dimensions, StyleSheet, I18nManager } from 'react-native';
import { colors, WP, size, family, HP } from '../../../../utilities';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: WP('5'),
    backgroundColor: colors.white,
  },
  titleTxtStyle: {
    color: colors.mediumDarkGray,
    fontSize: size.xxlarge,
    fontFamily: family.Poppins_Bold,
    textAlign: 'left',
  },
  paginationStyle: {
    backgroundColor: colors.white,
    height: 40,
    paddingTop: 0,
    marginTop: 15,
    marginBottom: -20,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  bgImgStyle: {
    borderRadius: 10,
    backgroundColor: colors.g2,
    height: HP('20'),
    width: WP('88'),
  },
  flStyle: {
    padding: 3,
    paddingBottom: 20,
  },

  backgroundShadow: {
    shadowColor: colors.mediumDarkGray,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: colors.white
  },
  bgImgStyle1: {
    borderRadius: 5,
    width: width / 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'android' ? HP('10') : HP('9'),
  },
  storesTxtStyle: {
    color: colors.mediumDarkGray,
    fontSize: size.xxsmall,
    alignSelf: 'center',
    fontFamily: family.Poppins_Regular,
    textAlign: 'center',
    paddingTop: 5,
    marginBottom: 3,
    width: width / 5
  },
  viewAllStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: family.Poppins_Regular,
    fontSize: size.xxsmall,
    color: colors.mediumDarkGray
  },
  imgTrending: {
    borderRadius: 100,
    width: 68,
    height: 68,
  },
  permissionButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  permissionViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightYellow,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  itemBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    backgroundColor: colors.white,
    width: 72,
    height: 72,
    borderRadius: 100,
    overflow: 'hidden'
  },
  imgBackground: {
    backgroundColor: colors.white,
    width: 68,
    height: 68,
    borderRadius: 100,
    overflow: 'hidden'
  }
});

export default styles;
