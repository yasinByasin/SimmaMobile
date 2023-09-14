import React from 'react';
import { Platform } from 'react-native';
import { I18nManager } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { family, colors, WP, size } from '../../utilities';

export const BoxInput = ({
  title,
  placeholder,
  placeholderTextColor,
  keyboardType,
  onChangeText,
  touched,
  error,
  value,
  onBlur,
  blurOnSubmit,
  disableFullscreenUI,
  autoCapitalize,
  onSubmitEditing,
  maxLength,
  returnKeyType,
  multiline,
  editable,
  zIndex=9999,
}) => {
  return (
    <View style={[styles.conatiner, {zIndex:zIndex}]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={[styles.inputContainer]}>
        <TextInput
          multiline={multiline}
          editable={editable}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={colors.midLightGray}
          style={[styles.inputStyle]}
          onChangeText={onChangeText}
          value={value}
          textAlignVertical={'top'}
          onBlur={onBlur}
          blurOnSubmit={blurOnSubmit}
          disableFullscreenUI={disableFullscreenUI}
          autoCapitalize={autoCapitalize}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          numberOfLines={8}
        />
      </View>
      {touched && error && (
        <View>
          <Text style={styles.errorStyle}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    // paddingVertical: 5,
  },
  titleContainer: {
    paddingVertical: 10,
  },
  inputStyle: {
    fontSize: size.xxsmall,
    fontFamily: family.Poppins_Regular,
    height: WP('40'),
    color: colors.mediumDarkGray,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    padding: 10,
    lineHeight: 20,
  },
  inputContainer: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    elevation: 4,
    height: WP('40'),
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Regular,
    textAlign: 'left',
    color: colors.mediumDarkGray,
    lineHeight: 22
  },
  errorStyle: {
    color: colors.pink,
    padding: 2,
    textAlign: 'left',
    fontSize: size.tiny,
    fontFamily: family.Poppins_Regular,
  },
});
