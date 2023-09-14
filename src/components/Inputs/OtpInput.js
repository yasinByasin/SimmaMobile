import React from 'react';
import {I18nManager, TextInput} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {family, colors, WP, size} from '../../utilities';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {TouchableOpacity} from 'react-native';
import I18n from '../../translations';

export const OtpInput = ({
  onCodeChanged,
  error,
  value,
  onCodeFilled,
  pinCount,
  timer_text,
  resend_text,
  count,
  onPressResend,
  disabled,
}) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.inputContainer}>
        <OTPInputView
          autoFocusOnLoad={false}
          // style={styles.inputStyle}
          pinCount={pinCount}
          codeInputFieldStyle={styles.inputStyle}
          // codeInputHighlightStyle={styles.inputStyle}
          onCodeFilled={onCodeFilled}
          code={value} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={onCodeChanged}
        />
      </View>
      {error && (
        <View>
          <Text style={styles.errorStyle}>{error}</Text>
        </View>
      )}
      { false && 
        <TouchableOpacity disabled={disabled} onPress={onPressResend}>
        <Text style={styles.resendCode}>
          {resend_text}
          {count > 0 && count < 60 ? (
            <Text>
              {timer_text}
              {count} {I18n.t('signup_code_time_format')}
            </Text>
          ) : (
            false
          )}
        </Text>
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {},
  titleContainer: {},

  title: {
    fontSize: size.small,
    color: colors.b2,
    fontWeight: '600',
  },
  inputContainer: {
    height: 44,
    borderRadius: WP('2'),
    borderColor: colors.g2,
    marginTop: 40,
    width: WP('85'),
    alignItems: 'center'
  },
  inputStyle: {
    height: 50,
    width: 50,
    fontSize: size.small,
    color: colors.mediumDarkGray,
    borderRadius: 5,
    fontWeight: '600',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 2,
    backgroundColor: colors.white
  },
  errorStyle: {
    color: colors.pink,
    padding: 5,
    textAlign: 'left',
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Regular,
  },
  resendCode: {
    fontSize: size.tiny,
    color: colors.red,
    fontFamily: family.Poppins_Medium,
    textAlign: I18nManager.isRTL ? 'left' : 'right',
    paddingVertical: 10,
  },
});
