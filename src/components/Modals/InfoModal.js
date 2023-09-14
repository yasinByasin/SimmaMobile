import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { colors, family, size, WP } from '../../utilities';

export const InfoModal = ({
  show,
  onPressHide,
  onPressYes,
  onPressNo,
  title,
  content = "",
  btntextYes,
  btntextNo,
  inCenter = false
}) => {
  return (
    <Modal
      onBackdropPress={onPressHide}
      isVisible={show}
      avoidKeyboard={true}>
      <View style={styles.modalContainer}>
        {title !== '' && <Text style={inCenter ? styles.centerTextStyle : styles.textStyle}>{title}</Text>}
        {content !== '' && <Text style={styles.contentStyle}>{content}</Text>}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onPressYes} style={[styles.btnContainer, { backgroundColor: colors.orange }]}>
            <Text style={[styles.btnText]}>{btntextYes}</Text>
          </TouchableOpacity>
          {btntextNo && (
            <TouchableOpacity onPress={onPressNo} style={styles.btnContainer}>
              <Text style={styles.btnText}>{btntextNo}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: WP('30'),
    paddingHorizontal: WP('5'),
    borderRadius: 12,
  },
  textStyle: {
    paddingTop: 30,
    fontFamily: family.Poppins_Bold,
    fontSize: size.normal,
    color: colors.mediumDarkGray,
    lineHeight: 23
  },
  centerTextStyle: {
    paddingTop: 30,
    fontFamily: family.Poppins_Bold,
    fontSize: size.xxlarge,
    color: colors.mediumDarkGray,
    lineHeight: 30,
    width: '100%',
    textAlign: 'center'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.trasn_g13,
    height: 33,
    width: 95,
    borderRadius: 5,
    margin: 10,
  },
  btnText: {
    color: colors.mediumDarkGray,
    fontFamily: family.Poppins_Medium,
    fontSize: size.normal,
  },
  contentStyle: {
    marginTop: 20,
    color: colors.mediumDarkGray,
    fontFamily: family.Poppins_Regular,
    fontSize: size.large,
    lineHeight: 28,
    width: '100%',
    textAlign: 'center'
  },
});
