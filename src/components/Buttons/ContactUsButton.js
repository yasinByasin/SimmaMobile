/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { colors, family, HP, size, WP } from '../../utilities';
import { Icon } from 'react-native-elements';

export const ContactUsButton = ({ onPress, label, background = colors.gray, }) => {
  const callUsNow = () => {
    try {
      Linking.openURL(
        'tel:+9647840385186',
      );
    } catch (error) {
      Toast.show(I18n.t('backend_error'), {
        position: Toast.position.CENTER,
        duration: 6000,
      });
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.contactUsContainer, { backgroundColor: background }]}
      onPress={() => callUsNow()}>
      <Text
        style={styles.linkStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkStyle: {
    fontSize: size.h6,
    color: colors.mediumDarkGray,
    fontFamily: family.Poppins_Regular,
  },
  contactUsContainer: {
    marginTop: 13,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: colors.gray,
    alignItems: 'center',
    height: 60,
  },
  contactUsIconContainer: {
    width: WP('12'),
    height: WP('12'),
    marginLeft: 10,
    marginTop: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: WP('8'),
    borderColor: colors.white,
    backgroundColor: colors.yellow,
    bottom: Platform.select({ android: 7, ios: 3 }),
  },
});
