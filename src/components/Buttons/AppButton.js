/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {colors, family, HP, size, WP} from '../../utilities';
import {Loader} from '../Loaders/Loader';

export const AppButton = ({onPress, txt, title, loading=false, backgroundColor=colors.b2, color=colors.white, buttonTextStyle, shadow={}, height='13', size=17}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      activeOpacity={0.7}
      style={[styles.buttonStyle, shadow, {backgroundColor: backgroundColor, height:WP(height)}]}
      onPress={onPress}>
      {!loading ? (
        <Text style={[styles.buttonText,{lineHeight: 25, fontSize: size, color}]}>
          {txt}
          {title}
        </Text>
      ) : (
        <Loader loader_color={colors.white} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: WP('13'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontFamily: family.Poppins_Regular,
    color: 'white',
  },
});
