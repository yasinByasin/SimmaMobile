import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  Platform
} from 'react-native';
import Modal from 'react-native-modal';
import { colors, family } from '../../utilities';
import { Icon, Divider } from 'react-native-elements';
import I18n from '../../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { Loader } from '../Loaders/Loader';

export const LanguageModal = ({
  show = true,
  setShowModal
}) => {
  const isAr = I18nManager.isRTL
  const [appLang, setAppLang] = useState(isAr ? 'ar' : 'en')
  const [loading, setLoading] = useState(false)

  const changeLanguage = async () => {

    const lang = await AsyncStorage.getItem('lang') || 'en';
    if (lang === appLang) {
      closeModal()
      return
    }
    setLoading(true)
    I18n.locale = lang;
    I18nManager.locale = appLang
    await AsyncStorage.setItem('lang', appLang);
    I18nManager.allowRTL(appLang === 'ar');
    I18nManager.forceRTL(appLang === 'ar');
    RNRestart.Restart()
  }

  const renderContent = () => {
    if (loading) {
      return (
        <View style={{ alignSelf: 'center' }}>
          <Loader loader_color={colors.black} loader_size={30} />
        </View>
      )
    }
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setAppLang('en')}
          style={styles.optionRow}>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              style={styles.iconStyle}
              color={appLang === 'en' ? colors.orange : colors.white}
              type={'feather'}
              name={'check'}
              size={20}
            />
            <Text style={{color: colors.mediumDarkGray, fontFamily: Platform.select({ android: 'SF-Pro-Text-Regular', ios: 'SF Pro Text Regular' }) }}>English</Text>
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setAppLang('ar')}
          style={styles.optionRow}
        >
          <View style={{ flexDirection: 'row' }}>
            <Icon
              style={styles.iconStyle}
              color={appLang === 'ar' ? colors.orange : colors.white}
              type={'feather'}
              name={'check'}
              size={20}
            />
            <Text style={{color: colors.mediumDarkGray, fontFamily: 'Almarai-Regular' }}>العربية</Text>
          </View>
        </TouchableOpacity>

        <View style={{ position: 'absolute', bottom: 15, alignSelf: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => changeLanguage()}
            style={styles.saveButton}>
            <Text style={{color: colors.black, fontFamily: family.Poppins_SemiBold }}>{I18n.t('done')}</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }

  const closeModal = () => {
    if (loading) return
    setShowModal(!show)
    setAppLang(isAr ? 'ar' : 'en')
  }

  return (
    <Modal
      onBackdropPress={() => closeModal()}
      isVisible={show}
      avoidKeyboard={true}>
      <View style={styles.modalContainer}>
        {renderContent()}
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    width: 300,
    alignSelf: 'center',
    padding: 15
  },
  optionRow: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 10
  },
  iconStyle: {
    marginRight: 10
  },
  saveButton: {
    borderRadius: 5,
    backgroundColor: colors.yellow,
    width: 200,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 45
  }
});