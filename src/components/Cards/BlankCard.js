import React from 'react';
import {I18nManager} from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, family} from '../../utilities';

export const BlankCard = ({title, btnText, showBtn, onPress}) => {
  return (
    <View style={style.textContainer}>
      <Text style={style.h1}>{title} </Text>
      {showBtn && (
        <TouchableOpacity onPress={onPress} style={style.btnConatiner}>
          <Text style={style.btnText}>{btnText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  btnConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.b1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  btnText: {
    fontSize: 18,
    color: colors.white,
  },
  h1: {
    fontSize: 20,
    color: colors.b1,
    fontFamily: family.Poppins_Medium,
    textAlign:'center'
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
