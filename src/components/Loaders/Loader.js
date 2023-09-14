import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {colors} from '../../utilities';

export const Loader = ({loader_color, loader_size=25}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={loader_size}
        color={loader_color != '' ? loader_color : colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
