import React from 'react';
import { I18nManager, Platform } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { family, colors, WP, size } from '../../utilities';

export const ProfileInput = ({
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
  editable,
  country,
  inputWidth,
  inputColor,
  multiline,
  customStyle,
}) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TextInput
        multiline={multiline}
        editable={editable}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
        style={[
          styles.inputStyle,
          customStyle,
          {
            color: colors.darkGray,
            paddingHorizontal: 10
          },
        ]}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
        blurOnSubmit={blurOnSubmit}
        disableFullscreenUI={disableFullscreenUI}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
      />
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
    paddingVertical: 5,
  },
  titleContainer: {
    // marginVertical: 7,
  },
  title: {
    fontSize: size.xsmall,
    color: colors.mediumDarkGray,
    fontFamily: family.Poppins_Regular,
    textAlign: 'left',
    lineHeight: 30,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',

  },
  inputStyle: {
    fontSize: size.xxsmall,
    fontFamily: family.Poppins_Medium,
    width: '100%',
    paddingVertical: Platform.select({ android: 0, ios: 5 }),
    borderBottomWidth: 1,
    borderColor: colors.g6,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  errorStyle: {
    fontSize: size.tiny,
    color: colors.pink,
    fontFamily: family.Poppins_Regular,
    textAlign: 'left',
    padding: 5
  },
  aiCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
