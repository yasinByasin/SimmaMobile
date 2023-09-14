import { I18nManager } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors, family, HP, size, WP } from '../../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  txtStyle: {
    color: colors.b1,
    fontSize: size.huge,
    fontFamily: I18nManager.isRTL ? family.Poppins_Bold : family.Poppins_SemiBold,
  },
  actionButtons: {
    backgroundColor: colors.gray,
    width: 110,
    height: 110,
    justifyContent: 'center',
    borderRadius: 100,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  btnStyle: {
    backgroundColor: colors.gray,
    width: 150,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 5,
    marginTop: 30
  },
  textStyle: {
    textAlign: 'center',
    fontSize: size.h6,
    color: colors.mediumDarkGray,
    fontFamily: family.Poppins_Medium,
    lineHeight: 32
  }
});

export default styles;
