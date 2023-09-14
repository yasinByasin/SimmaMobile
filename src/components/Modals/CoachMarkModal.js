import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  I18nManager
} from 'react-native';
import Modal from 'react-native-modal';
import { colors, family, size, WP, appLottie, appImages } from '../../utilities';
import { coachMarkModalKey } from '../../utilities/constants';
import Lottie from 'lottie-react-native';
import { Icon } from 'react-native-elements';
import I18n from '../../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CoachMarkModal = ({
  hasNotch,
}) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const checkUserCoachMark = async () => {

    const showCoachMark = await AsyncStorage.getItem(coachMarkModalKey) !== 'true'
    if (showCoachMark) {
      await AsyncStorage.setItem(coachMarkModalKey, 'true')
      setShowModal(true)
    }

    setTimeout(() => {
      setShowCloseButton(true)
    }, 6000);

  }
  useEffect(() => {
    checkUserCoachMark()
  }, [])
  return (
    <Modal
      onBackdropPress={() => showCloseButton ? setShowModal(false) : () => {} }
      isVisible={showModal}
      avoidKeyboard={true}>
      <View style={styles.modalContainer}>
        <View style={{ backgroundColor: colors.white, width: '100%', height: 350, borderRadius: 5 }}>
          {showCloseButton && <TouchableOpacity
            activeOpacity={0.7}
            style={{ position: 'absolute', left: 10 }}
            onPress={() => setShowModal(false)}>
            <Icon
              color={colors.mediumDarkGray}
              type={'feather'}
              name={'x'}
              size={30}
            />
          </TouchableOpacity>}
          <View>
            <Lottie style={{ height: 300, width: '100%', marginTop: 20 }} source={I18nManager.isRTL ? appLottie.coachMar_ar : appLottie.coachMar_en} autoPlay loop />
          </View>
        </View>
      </View>
      {
        showCloseButton && <View style={{ position: 'absolute', bottom: -20, left: -20, right: -20 }}>
          <View>
            <Lottie style={{ height: 70, width: 50, alignSelf: 'center' }} source={appLottie.arrow} autoPlay loop />
          </View>
          <View
            style={Platform.select({
              android: styles.barStyle,
              ios: hasNotch ? styles.notchBarStyle : styles.barStyle,
            })}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: WP('4'), }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.bottomIconContainer}
                onPress={() => { }}>
                <View style={{ width: WP('20'), alignItems: 'center' }}>
                  <Image source={appImages.buttonIcon} style={[styles.checkoutImgStyle]} />
                </View>
                <Image source={appImages.line} />
                <View style={{ width: WP('25'), alignItems: 'center', justifyContent: 'center' }}>
                  <Text numberOfLines={1} style={[styles.checkoutTxtStyle]}>{I18n.t('showCart')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: WP('5'),
    borderRadius: 12,
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
  checkoutImgStyle: {
    width: 47,
    height: 18,
  },
  checkoutTxtStyle: {
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Bold,
    color: colors.darkGray
  },
  barStyle: {
    height: Platform.select({ android: 65, ios: 70 }),
    backgroundColor: colors.gray,
  },
  notchBarStyle: {
    backgroundColor: colors.gray,
    height: 80,
  },
});
