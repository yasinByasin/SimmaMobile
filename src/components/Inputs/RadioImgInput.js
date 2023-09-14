import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, I18nManager, Image, TouchableOpacity, Animated, Platform } from 'react-native';
import { family, colors, size, WP, HP } from '../../utilities';
import { useSelector } from 'react-redux';
import I18n from '../../translations';
import { numberWithCommas } from '../../utilities/helper';

export const RadioImgInput = ({
  setPaymentError,
  paymentError,
  setPaymentMethodSelected,
  paymentMethods = []
}) => {
  const [methodSelected, setMethodSelected] = useState(null);
  const profile = useSelector(state => state.profile);
  const userBalance = profile?.profiledata?.wallet?.balance || 0
  const handleSelectPayment = (item) => {

    setMethodSelected(item)
    setPaymentMethodSelected(item)
    if (!item.active) {
      setPaymentError(I18n.t('billing_payment_method_error'))
    } else {
      setPaymentError('')
    }
  }

  const renderLables = (item) => {
    const freeDelivery = item?.freeDelivery
    const hasDiscount = item?.discount
    return (<>
      {hasDiscount && <Text style={[styles.radioLable, { color: colors.pink }]}>{item.discount}</Text>}
      {freeDelivery && <Text style={[styles.radioLable, { color: colors.delivered }]}>{I18n.t('freeDeliveryText')} </Text>}
    </>)
  }

  const renderMethod = (item) => {
    const isActive = item.active
    const isSimmaWallet = item.id === 'wallet'
    return (
      <View key={item.id}>
        <TouchableOpacity disabled={!isActive} onPress={() => handleSelectPayment(item)} style={[styles.item, { backgroundColor: methodSelected?.id === item.id ? colors.lightGray : colors.white, }]}>
          <View style={styles.imageStyle}>
            <Image
              source={item.img}
              style={[{ backgroundColor: colors.white, resizeMode: 'contain', width: '100%', opacity: isActive ? 1 : 0.5 }]}
            />
          </View>
          <View>
            <View style={{width: Platform.select({ android: WP('65'), ios: WP('60') }) , flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.radioLable, { color: isActive ? colors.darkGray : colors.lightGray }]}>{item.name} </Text>
              {isSimmaWallet && <Text style={styles.radioLable}>{I18n.t('IQD_CURRENCY')} {numberWithCommas(userBalance)}</Text>}
            </View>
            {isActive && renderLables(item)}
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const paymentMethodsSorted = () => {
    const methodsSorted = []
    const walletMethod = paymentMethods.find(method => method.id === 'wallet')
    const walletMethodId = walletMethod?.id || ''
    if (walletMethod) methodsSorted.push(walletMethod)
    paymentMethods.filter((item) => item.active && item?.id !== walletMethodId).forEach((paymentMethod, index) => {
      methodsSorted.push(paymentMethod)
    })
    paymentMethods.filter((item) => !item.active && item?.id !== walletMethodId).forEach((paymentMethod, index) => {
      methodsSorted.push(paymentMethod)
    })
    return methodsSorted
  }
  return (
    <View style={{ marginTop: 30 }}>
      {paymentMethodsSorted().map(item => {
        return (renderMethod(item))
      })}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  },
  errorStyle: {
    color: colors.pink,
    padding: 2,
    fontSize: size.tiny,
    fontFamily: family.Poppins_Bold,
    marginTop: 10,
    textAlign: 'left',
  },
  item: {
    alignItems: 'center',
    position: 'relative',
    width: WP('90'),
    height: 80,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.pink
  },
  radioLable: {
    textAlignVertical: 'center',
    alignItems: 'center',
    textAlign: 'left',
    fontFamily: family.Poppins_Bold,
    fontSize: 12,
    lineHeight: 17,
    marginHorizontal: Platform.select({ android: 10, ios: 0 }),
    color: colors.mediumDarkGray,
  },
  imageStyle: {
    marginRight: 15,
    backgroundColor: colors.white,
    shadowColor: colors.mediumDarkGray,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 0.5,
    width: 80,
    padding: 7,
    height: HP('8'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  }
})