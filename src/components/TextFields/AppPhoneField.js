import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, family, size, WP} from '../../utilities';
import I18n from '../../translations';

export const AppPhoneField = ({phone}) => {
  return (
    <View>
      <View style={style.titleContainer}>
        <Text style={style.title}>{I18n.t('login_mobile_number')}</Text>
      </View>
      <View style={style.inputContainerText}>
        <Text style={style.inputtextStyle}>
          {phone}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  inputContainerText: {
    borderRadius: WP('2'),
    paddingHorizontal: 10,
    borderWidth: 1,
    width: '100%',
    borderColor: colors.g6,
    justifyContent: 'center',
    height: 44,
  },
  inputtextStyle: {
    fontSize: size.small,
    fontFamily: family.Poppins_SemiBold,
    color: colors.g8,
    textAlign:'left'
  },
  titleContainer: {
    paddingVertical: 10,
  },
  title: {
    fontSize: size.small,
    color: colors.b2,
    fontFamily: family.Poppins_SemiBold,
    textAlign:'left'
  },
});
