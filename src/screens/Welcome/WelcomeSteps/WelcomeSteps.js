import React, { useEffect, useState } from 'react';
import { View, Text, I18nManager, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import I18n from '../../../translations';
import { Header, ToggleLanguage } from '../../../components';
import { colors, HP, size, WP, appLottie } from '../../../utilities';
import { useSelector } from 'react-redux';
import RNRestart from 'react-native-restart';
import Lottie from 'lottie-react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import DeviceInfo from 'react-native-device-info';

const MAX_STEP = 2
const WelcomeSteps = ({ navigation, route }) => {
  const login = useSelector(state => state.login);
  const [language, setLanguage] = useState('')
  const [page, setPage] = useState(0)
  const enBold = Platform.select({ android: 'SF-Pro-Text-Bold', ios: 'SF Pro Text Bold' })
  const enRegular = Platform.select({ android: 'SF-Pro-Text-Medium', ios: 'SF Pro Text Medium' })
  const arEnBold = { ar: 'Almarai-Bold', en: enBold }
  const anArRegularFonts = { ar: 'Almarai-Regular', en: enRegular }
  const stepLottie = [appLottie.welcomeStep1, appLottie.welcomeStep2, appLottie.welcomeStep3]
  const isAr = language === 'ar'
  let hasNotch = DeviceInfo.hasNotch();
  const titles = [
    { ar: 'تسوق العالم مع سما', en: 'Shop the world' },
    { ar: 'سما يعني أمان', en: 'Simma = Safe' },
    { ar: 'واصلك لباب بيتك', en: 'Doorstep delivery' }]
  const supTitles = [
    { ar: 'أقوى الماركات العالمية الأصلية واصلة للعراق', en: 'Enjoy original international brands delivered to Iraq' },
    { ar: 'تسوق من غير مقالب، فقط مفاجآت جميلة', en: 'No surprises, only happy ones' },
    { ar: 'أفضل أسعار التوصيل وين ما كنت بالعراق', en: 'Best delivery fees wherever\nyou are in Iraq' }]
  const headerRowStyle = {
    headerRow: { flexDirection: 'row' },
    goBackStyle: { alignItems: 'flex-start' }
  }

  if (language === 'ar') {
    if (!I18nManager.isRTL) {
      headerRowStyle.headerRow.flexDirection = 'row-reverse'
      headerRowStyle.goBackStyle.alignItems = 'flex-end'
    }
  } else {
    if (I18nManager.isRTL) {
      headerRowStyle.headerRow.flexDirection = 'row-reverse'
      headerRowStyle.goBackStyle.alignItems = 'flex-end'
    }
  }

  useEffect(() => {
    setLanguage(route.params.language)
  }, []);

  const handleCahneLanguage = async (lang) => {

    if (lang === 'Arabic') lang = 'ar'
    if (lang === 'English') lang = 'en'
    const isAr = lang === 'ar';
    await AsyncStorage.setItem('lang', lang);
    I18n.locale = lang;
    I18nManager.locale = lang;
    await I18nManager.allowRTL(isAr);
    await I18nManager.forceRTL(isAr);
    setLanguage(lang)
  }

  const handlePage = async (isSkip = false) => {
    if (page === MAX_STEP || isSkip) {
      await AsyncStorage.setItem('home__page', 'true');
      if ((isAr && !I18nManager.isRTL) || (!isAr && I18nManager.isRTL)) {
        await handleCahneLanguage(language)
        I18nManager.isRTL = isAr
        RNRestart.Restart();
        return
      }

      if (!login?.loggedInMode || login?.userdata !== null) {
        navigation.replace('App', { screen: 'Cart' });
      }
      // else {
      //   navigation.replace('Auth');
      // }

    } else {
      setPage(page + 1)
    }
  }

  const handleBackButton = () => {
    if (page === 0) {
      navigation.replace('Language')
    } else {
      setPage(page - 1)
    }
  }

  const renderText = () => {
    return (
      <>
        <Text style={[styles.titleText, { fontFamily: arEnBold[language] }]}>{isAr ? titles[page].ar : titles[page].en}</Text>
        <Text style={[styles.supTitleStyle, { fontFamily: anArRegularFonts[language] }]}>{isAr ? supTitles[page].ar : supTitles[page].en}</Text>
      </>
    )
  }

  const getPagination = () => {
    const activeDotIndex = !isAr ? MAX_STEP - page : page
    return (
      <Pagination
        dotsLength={MAX_STEP + 1}
        activeDotIndex={activeDotIndex}
        containerStyle={styles.paginationStyle}
        dotStyle={{
          width: 24,
          height: 7,
          borderRadius: 5,
          marginHorizontal: -7,
          backgroundColor: colors.lightGray2
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          marginHorizontal: -10,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Header height='0' />
      <Text>laksdlaksdjlaksdjalkd</Text>
      <View style={[styles.headerRow, headerRowStyle.headerRow]}>
        <TouchableOpacity
          style={[styles.headerContainer, headerRowStyle.goBackStyle, { width: 80, height: 50 }]}
          onPress={() => handlePage(true)}>
          <Text style={[styles.textStyle, { textDecorationLine: 'underline', fontSize: size.small, fontFamily: anArRegularFonts[language], color: colors.grayWeb }]}>{I18n.t('skip')}</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 7 }}>
          <ToggleLanguage setLanguage={(lang) => handleCahneLanguage(lang)} language={language === 'ar' ? 'Arabic' : 'English'} />
        </View>
      </View>
      <View style={{ alignItems: 'center', height: hasNotch ? HP('70') : HP('75'), paddingHorizontal: 15 }}>
        <View style={{ height: HP('6') }} />
        <View style={{ backgroundColor: colors.white }}>
          <Lottie style={{ height: HP('50'), width: WP('100') }} source={stepLottie[page]} autoPlay loop />
        </View>
        {renderText()}
      </View>
      <View style={{ alignItems: 'center', height: HP('5'), paddingHorizontal: 15 }}>
        {getPagination()}
      </View>
      <View style={[headerRowStyle.headerRow, styles.actionsRow]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePage()}
          style={[styles.btnStyle, { backgroundColor: colors.orange }]}
        >
          <Text style={[styles.textStyle, { fontFamily: arEnBold[language] }]}>{I18n.t(page === MAX_STEP ? 'start_shopping' : 'nextStep')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleBackButton()}
          style={[styles.btnStyle, { backgroundColor: colors.gray }]}
        >
          <Text style={[styles.textStyle, { fontFamily: arEnBold[language] }]}>{I18n.t('step_back_text')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeSteps;
