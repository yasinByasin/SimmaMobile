import React, { useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
  Platform
} from 'react-native';
import { WP, colors, size, family, appImages, HP } from '../../utilities';

export const ToggleLanguage = ({ setLanguage, language }) => {
  const enRegularFont = Platform.select({ android: 'SF-Pro-Text-Regular', ios: 'SF Pro Text Regular' })
  return (
    <>
      <View style={styles.container}>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setLanguage('Arabic')}
        style={[styles.languageButton, {backgroundColor: language === 'Arabic' ? colors.orange : colors.gray}]}>
        <Text style={{color: language === 'Arabic' ? colors.mediumDarkGray : colors.grayWeb, fontSize:size.tiny, textAlign: 'center', fontFamily: 'Almarai-Regular'}}>العربيه</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setLanguage('English')}
        style={[styles.languageButton, {backgroundColor: language === 'English' ? colors.orange : colors.gray}]}>
        <Text style={{color: language === 'English' ? colors.mediumDarkGray : colors.grayWeb, fontSize:size.tiny, textAlign: 'center', fontFamily: enRegularFont}}>English</Text>
      </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    width: 120,
    height: 40,
    flexDirection: 'row',
    borderRadius: 30,
    padding:2.5
  },
  languageButton:{
    width: '50%',
    justifyContent: 'center',
    borderRadius: 30
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',

  },
  headerContainer: {
    paddingRight: 10,
    justifyContent: 'center',
  },
  header: {
    color: colors.b2,
  },
  imageStyle: {
    height: 19,
    width: 12,
    resizeMode: 'contain',
  },
  heading2: {
    fontSize: size.h6,
    color: colors.b2,
    fontFamily: family.Poppins_Bold,
  },
  btnContainer: {
    borderRadius: 5,
    height: 45,
    width: WP('20'),
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: size.small,
    fontFamily: family.Poppins_Bold,
    color: colors.white,
  },
  rightIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  titleIcon: {
    height: 40,
    width: 40,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40 / 2,
    resizeMode: 'cover',
    backgroundColor: colors.orange,
    marginRight: 5,
  },
});
