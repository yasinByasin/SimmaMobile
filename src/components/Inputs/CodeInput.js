import React, {useState} from 'react';
import { Platform,TouchableOpacity, I18nManager, ActivityIndicator } from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { family, colors, WP, size } from '../../utilities';
import I18n from '../../translations';

export const CodeInput = ({
  couponCodeError,
  setCouponCode,
  isCouponCodeApplied,
  removeCouponCode,
  applyCouponCode,
  couponCode,
  isLoading
}) => {
  const [requiredFieldError , setRequiredFieldError] = useState(false);
  const couponCodeHandler = () => {
    if(isLoading){
      return;
    }
    if( !couponCode || couponCode.trim() == '' ){
      setRequiredFieldError(true);
      return;
    }
    if(!isCouponCodeApplied){
      return applyCouponCode();
    }else{
      return removeCouponCode();
    }
  }
  
  return (
    <View style={styles.rowContainer} >
      <View style={styles.rowContainerBtn}>
        <TextInput
        placeholder={I18n.t('applyCodePlaceholder')}
         style={[styles.inputStyle, { color: isCouponCodeApplied ? colors.g6: colors.b2, backgroundColor: colors.gray}]}
         onChangeText={couponCode => {setRequiredFieldError(false); setCouponCode(couponCode)}}
         value={couponCode}
         editable={!isCouponCodeApplied}
         placeholderTextColor={colors.g3}
        />
        <TouchableOpacity
            activeOpacity={0.7}
            style={ styles.buttonContainer}
            onPress={couponCodeHandler}>
            { isLoading ? 
              <View style={[styles.btnTxtStyle, {flex: 1,justifyContent: "center"}]}>
                <ActivityIndicator color={colors.black} size="small" />
              </View>
              :
              <Text numberOfLines={1} style={[styles.btnTxtStyle]}>
              {isCouponCodeApplied ?  I18n.t('remove'): I18n.t('apply')}
              </Text>
            }
        </TouchableOpacity>
      </View>
      <View>
        { couponCodeError && !requiredFieldError && couponCode.trim() != '' && <Text style={styles.errorStyle}>{I18n.t('discountCodeError')} </Text>}
        { requiredFieldError &&  <Text style={styles.errorStyle}>{I18n.t('shop_address_required')} </Text> }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainerBtn: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputStyle: {
    fontSize: size.xxsmall,
    fontFamily: family.Poppins_SemiBold,
    width: '75%',
    paddingVertical: Platform.select({ android: 0, ios: 5 }),
    color: colors.b2,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    backgroundColor: colors.white,
    borderRadius: 5,
    height: WP('11.2'),
    padding: WP('4'),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  errorStyle: {
    color: colors.pink,
    paddingTop: 5,
    textAlign: 'left',
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Medium,

  },
  btnTxtStyle: {
    padding: 8,
    color:colors.black,
    fontSize: size.small,
    textAlign: 'center',
    top: Platform.select({android: 1}),
    fontFamily: family.Poppins_SemiBold,
    borderEndWidth: 1,
    borderRadius: 6,
    borderColor:colors.black,
    borderWidth: 1,
    backgroundColor: colors.gray,
    height: WP('11')
  },
  buttonContainer: { borderRadius: 6, width: '22%', backgroundColor:colors.wheat},
  rowContainer: { 
    marginTop: 10
  }
});
