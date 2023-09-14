import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, family, size} from '../../utilities';
import I18n from '../../translations';

export const ProfilePhoneField = ({phone, customStyle}) => {
  return (
    <View style={[style.container]}>
      <View style={style.titleContainer}>
        <Text style={style.title}>{I18n.t('login_mobile_number')}</Text>
      </View>
      <View style={[style.inputContainerText, customStyle]}>
        <Text style={style.inputtextStyle}>
          {phone}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  titleContainer: {
    paddingTop: 10,
  },
container: {
    paddingVertical: 5,
  },
  title: {
    fontSize: size.xsmall,
    color: colors.mediumDarkGray,
    fontFamily: family.Poppins_Regular,
    textAlign: 'left',
    height: 25
  },

  inputContainerText: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.g6,
    paddingVertical:5,
    paddingLeft: 10,
    paddingTop: 8

  },
  inputtextStyle: {
    fontSize: size.xxsmall,
    fontFamily: family.Poppins_SemiBold,
    color: colors.g8,
  },
});
