import { I18nManager } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors, family, HP, size, WP } from '../../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerRow: {
    height: HP('7'),
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },
  headerContainer: {
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: 19,
    width: 12,
    resizeMode: 'contain',
  },
  supTitleStyle: {
    color: colors.mediumDarkGray,
    fontSize: size.normal,
    fontFamily: family.Poppins_Regular,
    textAlign: 'center',
    marginVertical: 10,
    width: WP('80'),
    lineHeight: 25
  },
  titleText: {
    textAlign: 'center',
    fontSize: size.h1,
    color: colors.mediumDarkGray,
    fontFamily: family.Poppins_Medium,
    lineHeight: 50

  },
  btnStyle: {
    backgroundColor: colors.gray,
    width: WP('44'),
    height: HP('7'),
    justifyContent: 'center',
    borderRadius: 5,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: size.xlarge,
    color: colors.mediumDarkGray,
    fontFamily: family.Poppins_Medium,
    lineHeight: 30
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  actiovRow: {
    alignItems: 'center'
  },
  paginationStyle: {
    backgroundColor: colors.white,
    height: 40,
    paddingTop: 0,
    marginTop: 15,
    flexDirection: 'row',
  },
  actionsRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: HP('8'),
    paddingHorizontal: 10
  }
});

export default styles;
