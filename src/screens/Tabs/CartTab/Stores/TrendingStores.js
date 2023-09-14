import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  I18nManager,
  Platform
} from 'react-native';
import { colors } from '../../../../utilities';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient'

export const TrendingStores = ({ stores, replaceScreen }) => {
  const renderItem = ({ item, index }) => {
    return (
      <LinearGradient
        colors={[colors.orange, colors.lightOrange]}
        style={styles.itemBorder}
      >
        <View style={styles.imgBackground}>
          <TouchableOpacity
            key={index}
            activeOpacity={0.95}
            onPress={() => replaceScreen(item)}>
            <View style={{ resizeMode: 'cover' }}>
              <FastImage
                key={`image_${index}`}
                source={{
                  uri: item?.image?.originalUrl,
                  priority: FastImage.priority.high,
                }}
                style={[styles.imgTrending]}
              />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }

  if (stores?.length === 0) return <></>
  const trendingStores = stores.filter((store) => (store.status === 'published' && store?.categorys?.includes('trending')))

  const len = trendingStores.length
  const isAr = I18nManager.isRTL
  const isIos = Platform.select({ ios: true, android: false })
  const flatListData = (!isIos && isAr && len < 5) ? trendingStores.reverse() : trendingStores
  const inverted = isIos || (trendingStores.length >= 5) ? false : isAr
  return (<SafeAreaView style={{ backgroundColor: colors.white, marginTop: 30 }}>
    <FlatList
      horizontal={true}
      data={flatListData}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index}
      scrollEnabled={trendingStores.length >= 5}
      inverted={inverted}
    />

  </SafeAreaView>)
}


