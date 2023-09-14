import React from 'react';
import { StyleSheet, Text, View, I18nManager } from 'react-native';
import { family, colors, size } from '../../utilities';
import DropDownPicker from 'react-native-dropdown-picker';

export const DropdownInput = ({
  placeholder,
  value,
  setValue,
  setItems,
  items,
  setOpen,
  open,
  direction,
  bgColor = colors.white,
  txtColor = colors.b2,
  errorField,
  customStyle = {},
}) => {
  return (
    <>
      <DropDownPicker
        style={[styles.dropdownStyle, { backgroundColor: bgColor, paddingHorizontal: 10 }, customStyle ]}
        labelStyle={[styles.labelStyle]}
        placeholder={placeholder}
        placeholderStyle={[styles.placholderStyle]}
        listItemContainerStyle={[styles.itemContainer]}
        open={open}
        arrowIconStyle={{ tintColor: txtColor }}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          nestedScrollEnabled: true,
        }}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        dropDownDirection={direction}
        setItems={setItems}
        dropDownContainerStyle={[styles.itemStyle]}
        textStyle={[styles.itemTextStyle]}
      />
      {errorField != '' && <Text style={styles.errorStyle}>{errorField} </Text>}
    </>
  );
};

const styles = StyleSheet.create({
  //DropDown Styles
  dropdownContainer: {
    // paddingVertical: 10,
  },
  dropdownStyle: {
    borderWidth: 0,
    height: 30,
    paddingHorizontal: 0,
  },
  labelStyle: {
    textAlign: 'left',
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Medium,
    color: colors.mediumDarkGray
  },
  placholderStyle: {
    textAlign: 'left',
    fontSize: size.small,
    fontFamily: family.Poppins_Medium,
    color: colors.mediumDarkGray
  },
  itemStyle: {
    borderWidth: 0,
    backgroundColor: colors.gray,
    elevation: 2,
    padding: 10,
    position: 'relative',
    top: 0
  },
  itemContainer: {
    paddingHorizontal: 0,
  },
  errorStyle: {
    color: colors.pink,
    padding: 2,
    textAlign: 'left',
    fontSize: size.tiny,
    fontFamily: family.Poppins_Regular,
    marginTop: 20,
  },
  itemTextStyle: {
    textAlign: 'left',
    fontFamily: family.Poppins_Regular,
    color: colors.mediumDarkGray,
    lineHeight: 25,
  },
});
