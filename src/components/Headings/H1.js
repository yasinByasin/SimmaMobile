import React from 'react';
import {I18nManager} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {family, colors, WP, size} from '../../utilities';
export const H1 = ({title, fontFamily}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.h1, {fontFamily: fontFamily }]}>{title} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  h1: {
    fontSize: size.h2,
    color: colors.b2,
    textAlign: 'left'
  },
});
