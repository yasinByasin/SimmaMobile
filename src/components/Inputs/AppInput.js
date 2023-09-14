import React from 'react';
import { Platform } from 'react-native';
import { I18nManager } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { family, colors, WP, size } from '../../utilities';

export const AppInput = ({
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
  onEndEditing,
  autoFocus,
  ref
}) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={[styles.inputContainer]}>
        {country && (
          <View style={styles.aiCenter}>
            <Text style={[styles.inputStyle1, { color: inputColor }]}>
              {placeholder}
            </Text>
          </View>
        )}
        <TextInput
          ref={ref}
          autoFocus={autoFocus}
          editable={editable}
          keyboardType={keyboardType}
          placeholder={country ? '' : placeholder}
          placeholderTextColor={placeholderTextColor}
          style={[
            styles.inputStyle,
            {
              width: inputWidth != '80%' ? '100%' : '80%',
              textAlign: I18nManager.isRTL
                ? country
                  ? 'left'
                  : 'right'
                : 'left',
              paddingHorizontal:
                Platform.OS == 'android' && inputWidth == '80%' ? 0 : 0,
              color: inputColor,
              paddingVertical: 1
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
          onEndEditing={onEndEditing}

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
    paddingVertical: 5,
  },
  titleContainer: {
    paddingVertical: 10,
  },
  title: {
    fontSize: size.small,
    color: colors.mediumDarkGray,
    fontFamily: family.Poppins_Regular,
    textAlign: 'left',
  },
  inputContainer: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    height: 55,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    elevation: 4,
    backgroundColor: colors.white
  },
  inputStyle: {
    fontSize: size.h5,
    fontFamily: family.Poppins_SemiBold,
    paddingVertical: 0,
    paddingVertical: WP('1'),
  },
  inputStyle1: {
    fontSize: size.h5,
    fontFamily: family.Poppins_SemiBold,
    paddingHorizontal: 0,
  },
  errorStyle: {
    fontSize: size.xsmall,
    color: colors.pink,
    padding: 5,
    textAlign: 'left',
    fontFamily: family.Poppins_Regular,
  },
  aiCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    borderColor: colors.lightGray2,
    borderLeftWidth: I18nManager.isRTL ? 1 : 0,
    borderRightWidth: I18nManager.isRTL ? 0 : 1,
    marginHorizontal: 10,
  },
});
