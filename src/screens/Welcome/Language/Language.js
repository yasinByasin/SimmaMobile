import React, { useEffect, useState } from 'react';
import { View, Text, I18nManager, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import I18n from '../../../translations';
import { appImages, colors, HP, appLottie, WP, size, family } from '../../../utilities';
import Lottie from 'lottie-react-native';
import { Header } from '../../../components/Header/Header'
const Language = ({ navigation }) => {
  const [language, setLanguage] = useState('')
  const enBoldFont = Platform.select({ android: 'SF-Pro-Text-Bold', ios: 'SF Pro Text Bold' })
  const enRegularFont = Platform.select({ android: 'SF-Pro-Text-Regular', ios: 'SF Pro Text Regular' })
  const anArBoldFonts = { ar: 'Almarai-Bold', en: enBoldFont }
  const anArRegularFonts = { ar: 'Almarai-Regular', en: enRegularFont }
  const isAr = language === 'ar'
  useEffect(() => {
    handleNavigation();
  }, []);

  const handleNavigation = async () => {
    const lang = await AsyncStorage.getItem('lang') || 'ar';
    handleCahneLanguage(lang)
  };

  const handleCahneLanguage = (lang) => {
    I18n.locale = lang
    I18nManager.locale = lang
    const isAr = lang === 'ar'
    I18nManager.allowRTL(isAr)
    I18nManager.forceRTL(isAr)
    I18nManager.swapLeftAndRightInRTL(isAr)
    setLanguage(lang)
    AsyncStorage.setItem('lang', lang)
  }

  const moveToNextStep = () => {
    if (language === '') {
      alert("select lang")
    } else {
      navigation.navigate('WelcomeSteps', { language: language })
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Header height='28' />
      <Lottie style={{ height: HP('30'), justifyContent: 'center', alignItems: 'center' }} source={appLottie.welcome} autoPlay loop />
      <View style={{ height: HP('55'), justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: size.small, fontFamily: anArRegularFonts[language], marginVertical: 10, color: colors.grayWeb }}>{I18n.t('selectLanguage')}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleCahneLanguage('ar')}
            style={[styles.actionButtons, { opacity: isAr ? 1 : 0.8, backgroundColor: isAr ? colors.midLightGray : colors.gray }]}
          >
            <Text style={[styles.textStyle, { color: isAr ? colors.black : colors.mediumDarkGray, fontFamily: 'Almarai-Bold' }]}>العربية</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleCahneLanguage('en')}
            style={[styles.actionButtons, { opacity: isAr ? 0.8 : 1, backgroundColor: isAr ? colors.gray : colors.midLightGray }]}
          >
            <Text style={[styles.textStyle, { color: isAr ? colors.mediumDarkGray : colors.black, fontFamily: enBoldFont }]}>English</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => moveToNextStep()}
          style={[styles.btnStyle, { backgroundColor: colors.orange }]}
        >
          <Text style={[styles.textStyle, { fontFamily: anArBoldFonts[language] }]}>{I18n.t('start')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Language;
