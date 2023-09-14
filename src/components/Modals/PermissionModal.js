import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Linking
} from 'react-native';
import Modal from 'react-native-modal';
import { colors, family, size } from '../../utilities';
import { postNotificationKey } from '../../utilities/constants';
import I18n from '../../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PermissionModal = ({
  show = true,
  setShowModal
}) => {
  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
    AsyncStorage.setItem(postNotificationKey, 'true')
    setShowModal(false)
  };

  const renderContent = () => {
    return (
      <>
        <View style={{ height: 135, alignContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontFamily: family.Poppins_Bold, lineHeight: 28, fontSize: size.large, marginTop: 10 }}>
            {I18n.t('enableNotificationTitle')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleOpenSettings()}
            style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{I18n.t('yes')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowModal(false)}
            style={[styles.actionButton, { backgroundColor: colors.gray }]}>
            <Text style={styles.actionButtonText}>{I18n.t('no')}</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }

  return (
    <Modal
      onBackdropPress={() => setShowModal(false)}
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
    padding: 10
  },
  actionButton: {
    borderRadius: 5,
    backgroundColor: colors.yellow,
    width: '49%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 45
  },
  actionButtonText: {
    fontFamily: family.Poppins_Medium,
    fontSize: size.medium
  }
});