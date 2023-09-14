import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { family, colors ,WP, size} from "../../utilities";
export const H2 = ({ title,fontFamily, color=colors.b2 }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.h1,{fontFamily:fontFamily, color: color}]}>{title}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
      paddingVertical:5,
    },
  h1: {
    fontSize: size.h5,
    color:  colors.b2,
textAlign:'left'
  },
});
