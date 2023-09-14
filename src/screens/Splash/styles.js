import { I18nManager } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors, family, size } from '../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtStyle: {
    color: colors.b1,
    fontSize: size.huge,
    fontFamily: I18nManager.isRTL ? family.Poppins_Bold : family.Poppins_SemiBold,
  },
});

export default styles;
