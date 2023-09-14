/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator, ScrollView, I18nManager } from 'react-native';
import { Header } from '../../components';
import { colors, family, HP, size, WP, appImages } from '../../utilities';
import { Icon } from 'react-native-elements';

export const InfoPage = ({ onPress, title, data, buttonText, image, backButton, showButton = true }) => {
  const renderTitleImg = (title) => {
    return (<View>
      <Image
        source={image}
        style={styles.imgStyle}
        PlaceholderContent={
          <ActivityIndicator color={colors.b2} size={'small'} />
        }
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ position: 'absolute', left: 15, top: HP('13'), backgroundColor: '#FFFFFF67', borderRadius: 100 }}
        onPress={() => backButton()}>
        <Icon
          color={colors.mediumDarkGray}
          type={'feather'}
          name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
          size={35}
        />
      </TouchableOpacity>
    </View>)
  }

  const renderInfoData = (item, index) => {
    const pontNum = index + 1 <= 9 ? `0${index + 1}` : `${index + 1}`
    return (
      <View>
        <View style={styles.titleViewStyle}>
          <View style={styles.pointNumViewStyle}>
            <Text style={styles.pointNumTextStyle}>{pontNum}</Text>
          </View>
          <Text style={styles.textTitleStyle}>{item.title}</Text>
        </View>
        <Text style={styles.detailsTextStyle}>{item.details}</Text>
      </View>
    )
  }

  return (
    <>
      <Header height={'0'} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {renderTitleImg()}
        <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
          <Text style={styles.titleStyle}>{title}</Text>
          {data.map(renderInfoData)}
        </View>

        {showButton && <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => onPress()}>
          <Text style={styles.buttonTextStyle}>{buttonText}</Text>
        </TouchableOpacity>}

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: size.xxlarge,
    fontFamily: family.Poppins_Bold,
    color: colors.b2,
  },
  buttonStyle: {
    backgroundColor: colors.orange,
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10
  },
  titleViewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5
  },
  titleStyle: {
    fontFamily: family.Poppins_Bold,
    fontSize: size.xxlarge,
    color: colors.mediumDarkGray,
    marginBottom: 20,
    textAlign: 'left',
    lineHeight: 30,
  },
  imgStyle: {
    width: WP('100'),
    height: HP('30'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textTitleStyle: {
    fontFamily: family.Poppins_Bold,
    fontSize: size.medium,
    color: colors.mediumDarkGray,
    textAlign: 'left',
    lineHeight: 22,
  },
  buttonTextStyle: {
    fontFamily: family.Poppins_Bold,
    fontSize: size.medium,
    color: colors.mediumDarkGray,
    lineHeight: 25,
  },
  pointNumViewStyle: {
    backgroundColor: colors.gray,
    borderRadius: 100,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  pointNumTextStyle: {
    fontFamily: family.Poppins_Medium,
    color: colors.mediumDarkGray
  },
  detailsTextStyle: {
    fontFamily: family.Poppins_SemiBold,
    color: colors.grayWeb,
    marginLeft: 28,
    marginBottom: 30,
    textAlign: 'left',
    lineHeight: 20,
  },
});
