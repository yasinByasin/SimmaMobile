import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import { appIcons } from '../../assets';
import { WP, colors, size, family, appImages } from '../../utilities';
import { ToggleLanguage } from '../../components';
import MyStatusBar from './statusBar';

export const Header = ({
  title,
  backButton,
  navigation,
  h2,
  h3,
  fonstSize,
  fontFamily,
  disabled,
  rightBtn,
  onPressH2,
  rightIcon,
  rightBtnWidth,
  rightBtnBg,
  h3fonstSize,
  h3fontFamily,
  rightBtnHeight = 35,
  rowReverse,
  titleImg,
  height = '15',
  showChangeLanguage = false,
  language,
  setLanguage,
  backAction
}) => {
  return (
    <>
      <MyStatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={[styles.container, {height:WP(height)}]}>
        <View style={[styles.wrapper, { flexDirection: rowReverse ? 'row-reverse' : 'row' }]}>
          <View style={styles.contentContainer}>
            {backButton ? (
              <TouchableOpacity
                style={[styles.headerContainer, { width: 60, height: 50 }]}
                onPress={() => {
                  backAction ? backAction() : navigation.goBack();
                }}>
                {I18nManager.isRTL ? (
                  <Image
                    source={appIcons.forwardArrow}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Image
                    source={appIcons.backArrow}
                    style={styles.imageStyle}
                  />
                )}
              </TouchableOpacity>
            ) : (
              false
            )}
            { (titleImg || title)&&<TouchableOpacity
              disabled={disabled}
              style={[styles.headerContainer]}
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={{ flexDirection: 'row' }}>
                {titleImg && <View style={styles.titleIcon}>
                  <>
                  <Image
                  source={titleImg}
                  style={{width:30, height:11}}
                />
                  </>
                </View>}
                <Text
                  style={[
                    styles.header,
                    {
                      fontSize: fonstSize,
                      fontFamily: fontFamily,
                      color: colors.mediumDarkGray,
                    },
                  ]}>
                  {title}
                </Text>
              </View>
            </TouchableOpacity>}
          </View>
          <View style={{ right: !rightBtn ? 20 : -15 }}>
            <Text style={[styles.heading2]}>{h2}</Text>
          </View>
          {rightBtn ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressH2}
              style={[
                styles.btnContainer,
                {
                  backgroundColor: colors.orange,
                  width: rightBtnWidth,
                  height: rightBtnHeight,
                },
              ]}>
              {rightIcon ? (
                <Image source={rightIcon} style={styles.rightIconStyle} />
              ) : (
                <Text
                  style={[
                    styles.btnText,
                    {
                      fontSize: h3fonstSize,
                      fontFamily: h3fontFamily,
                      color: colors.mediumDarkGray,
                    },
                  ]}>
                  {h3}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {showChangeLanguage && (<ToggleLanguage language={language} setLanguage={setLanguage} />)}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: WP('15'),
    backgroundColor: colors.white,
    paddingHorizontal: WP('5'),
    paddingVertical: 5,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',

  },
  headerContainer: {
    paddingRight: 10,
    justifyContent: 'center'
  },
  header: {
    color: colors.b2,
  },
  imageStyle: {
    height: 19,
    width: 12,
    resizeMode: 'contain',
  },
  heading2: {
    fontSize: size.h6,
    color: colors.b2,
    fontFamily: family.Poppins_Bold,
  },
  btnContainer: {
    borderRadius: 5,
    height: 45,
    width: WP('20'),
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: size.small,
    fontFamily: family.Poppins_Bold,
    color: colors.white,
  },
  rightIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  titleIcon: {
    height: 40,
    width: 40,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40 / 2,
    resizeMode: 'cover',
    backgroundColor: colors.orange,
    marginHorizontal: 5,
  },
});
