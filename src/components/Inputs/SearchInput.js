import React, { useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, I18nManager } from "react-native";
import { Icon } from "react-native-elements";
import { HP, colors, size, family, WP, appImages } from '../../utilities';
import I18n from '../../translations';

export const SearchInput = ({ inFiltering }) => {

  const [searchPhrase, setSearchPhrase] = useState('')

  const handleSearch = value => {
    setSearchPhrase(value)
    inFiltering(value)
  }
  return (
    <View
      style={styles.searchBarStyle}
    >
      <Icon
        style={{}}
        color={colors.grayWeb}
        type={'feather'}
        name={'search'}
        size={WP('4')}
      />
      <TextInput
        placeholderTextColor={colors.midLightGray}
        style={styles.input}
        placeholder={I18n.t('searchPlaceholder')}
        value={searchPhrase}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  searchBarStyle: {
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: colors.gray,
    borderRadius: 15,
    alignItems: "center",
  },
  input: {
    fontSize: size.small,
    marginHorizontal: 5,
    width: "90%",
    fontFamily: family.Poppins_SemiBold,
    height: HP('6'),
    color: colors.mediumDarkGray,
    textAlign: I18nManager.isRTL ? 'right' : 'left'
  },
});