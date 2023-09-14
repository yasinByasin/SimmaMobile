/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors, family, HP, size, WP} from '../../utilities';

export const AppFooter = ({onPress, title, fontSize}) => {
  return (
    <View  style={styles.container}>

    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle]}
      activeOpacity={0.7}>
      <Text style={[styles.title, {fontSize: fontSize}]}>{title}</Text>
    </TouchableOpacity>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    padding: WP('5'),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 17,
    fontFamily: family.Poppins_Bold,
    color: colors.b2,
  },
  buttonStyle: {
    backgroundColor: colors.g13,
    width: '100%',
    height: WP('13'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
